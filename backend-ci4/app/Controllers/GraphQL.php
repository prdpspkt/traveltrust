<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\GraphQL\Types\TypeRegistry;
use App\GraphQL\Resolvers\QueryResolver;
use App\GraphQL\Resolvers\MutationResolver;

class GraphQL extends ResourceController
{
    use ResponseTrait;

    protected $format = 'json';

    public function index()
    {
        try {
            // Handle GET requests (for testing/GraphiQL)
            if (strtolower($this->request->getMethod()) === 'get') {
                return $this->respond([
                    'status' => 'success',
                    'message' => 'GraphQL endpoint is working. Send POST requests with query and variables.',
                    'endpoint' => 'POST /api/graphql',
                    'example' => [
                        'query' => '{ settings { key value } }',
                        'variables' => []
                    ]
                ]);
            }

            // Log the request
            log_message('debug', 'GraphQL Request received: ' . $this->request->getBody());

            $input = $this->request->getJSON(true);

            if (!isset($input['query'])) {
                log_message('error', 'GraphQL: Query is required');
                return $this->fail([
                    'status' => 'error',
                    'message' => 'Query is required'
                ], 400);
            }

            $query = $input['query'];
            $variables = $input['variables'] ?? [];

            // Initialize type registry
            $typeRegistry = new TypeRegistry();

            // Create schema
            $queryType = $typeRegistry->getQueryType();
            $mutationType = $typeRegistry->getMutationType();

            $config = SchemaConfig::create()
                ->setQuery($queryType)
                ->setMutation($mutationType);

            $schema = new Schema($config);

            // Execute query
            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                null,
                [
                    'session' => session(),
                    'request' => $this->request
                ],
                $variables
            );

            $output = $result->toArray();

            if (isset($output['errors'])) {
                return $this->respond($output, 200);
            }

            return $this->respond($output);

        } catch (\Exception $e) {
            log_message('error', 'GraphQL Error: ' . $e->getMessage());
            log_message('error', 'GraphQL Trace: ' . $e->getTraceAsString());
            return $this->fail([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => ENVIRONMENT === 'development' ? $e->getTraceAsString() : null
            ], 500);
        }
    }
}
