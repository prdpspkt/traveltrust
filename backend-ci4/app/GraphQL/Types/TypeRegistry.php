<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;
use App\GraphQL\Resolvers\QueryResolver;
use App\GraphQL\Resolvers\MutationResolver;

class TypeRegistry
{
    private static $types = [];

    public function __construct()
    {
        $this->initializeTypes();
    }

    private function initializeTypes()
    {
        // Register all types
        self::$types['Setting'] = new ObjectType([
            'name' => 'Setting',
            'fields' => [
                'key' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['Destination'] = new ObjectType([
            'name' => 'Destination',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'icon' => Type::nonNull(Type::string()),
                'slug' => Type::nonNull(Type::string()),
                'description' => Type::string(),
                'image_url' => Type::string(),
                'country' => Type::string(),
                'is_featured' => Type::nonNull(Type::boolean()),
                'status' => Type::nonNull(Type::string()),
                'meta_title' => Type::string(),
                'meta_description' => Type::string(),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['TeamMember'] = new ObjectType([
            'name' => 'TeamMember',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'position' => Type::nonNull(Type::string()),
                'bio' => Type::string(),
                'photo_url' => Type::string(),
                'email' => Type::string(),
                'phone' => Type::string(),
                'facebook' => Type::string(),
                'twitter' => Type::string(),
                'linkedin' => Type::string(),
                'instagram' => Type::string(),
                'display_order' => Type::int(),
                'status' => Type::nonNull(Type::string()),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['Testimonial'] = new ObjectType([
            'name' => 'Testimonial',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'client_name' => Type::nonNull(Type::string()),
                'client_position' => Type::string(),
                'client_photo' => Type::string(),
                'rating' => Type::nonNull(Type::int()),
                'testimonial_text' => Type::nonNull(Type::string()),
                'is_featured' => Type::nonNull(Type::boolean()),
                'status' => Type::nonNull(Type::string()),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
                'destination' => Type::string()
            ]
        ]);

        self::$types['Inquiry'] = new ObjectType([
            'name' => 'Inquiry',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'email' => Type::nonNull(Type::string()),
                'phone' => Type::string(),
                'subject' => Type::string(),
                'message' => Type::nonNull(Type::string()),
                'status' => Type::nonNull(Type::string()),
                'admin_notes' => Type::string(),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['NewsletterSubscriber'] = new ObjectType([
            'name' => 'NewsletterSubscriber',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'email' => Type::nonNull(Type::string()),
                'name' => Type::string(),
                'status' => Type::nonNull(Type::string()),
                'subscribed_at' => Type::string(),
                'unsubscribed_at' => Type::string(),
            ]
        ]);

        self::$types['Booking'] = new ObjectType([
            'name' => 'Booking',
            'fields' => function() {
                return [
                    'id' => Type::nonNull(Type::int()),
                    'name' => Type::nonNull(Type::string()),
                    'email' => Type::string(),
                    'phone' => Type::nonNull(Type::string()),
                    'adults' => Type::nonNull(Type::int()),
                    'children' => Type::int(),
                    'departure_date' => Type::nonNull(Type::string()),
                    'return_date' => Type::string(),
                    'status' => Type::string(),
                    'message' => Type::string(),
                    'created_at' => Type::string(),
                    'updated_at' => Type::string(),
                    'from_airport' => Type::nonNull(Type::string()),
                    'to_airport' => Type::nonNull(Type::string())
                ];
            }
        ]);

        self::$types['Offer'] = new ObjectType([
            'name' => 'Offer',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'title' => Type::nonNull(Type::string()),
                'description' => Type::string(),
                'discount_percentage' => Type::float(),
                'discount_amount' => Type::float(),
                'code' => Type::string(),
                'valid_from' => Type::string(),
                'image_url' => Type::string(),
                'valid_until' => Type::string(),
                'status' => Type::nonNull(Type::string()),
                'display_order' => Type::int() ?? 0,
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['Partner'] = new ObjectType([
            'name' => 'Partner',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'logo_url' => Type::string(),
                'website' => Type::string(),
                'description' => Type::string(),
                'display_order' => Type::int(),
                'status' => Type::nonNull(Type::string()),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ]
        ]);

        self::$types['Admin'] = new ObjectType([
            'name' => 'Admin',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'username' => Type::nonNull(Type::string()),
                'email' => Type::nonNull(Type::string()),
                'full_name' => Type::nonNull(Type::string()),
                'role' => Type::nonNull(Type::string()),
                'status' => Type::nonNull(Type::string()),
                'last_login' => Type::string(),
                'created_at' => Type::string(),
            ]
        ]);

        self::$types['MutationResponse'] = new ObjectType([
            'name' => 'MutationResponse',
            'fields' => [
                'status' => Type::nonNull(Type::string()),
                'message' => Type::nonNull(Type::string()),
                'data' => Type::string(),
                'errors' => Type::string(),
            ]
        ]);

        self::$types['AuthResponse'] = new ObjectType([
            'name' => 'AuthResponse',
            'fields' => function() {
                return [
                    'status' => Type::nonNull(Type::string()),
                    'message' => Type::nonNull(Type::string()),
                    'data' => self::$types['Admin'],
                ];
            }
        ]);

        self::$types['SetupResponse'] = new ObjectType([
            'name' => 'SetupResponse',
            'fields' => [
                'status' => Type::nonNull(Type::string()),
                'needsSetup' => Type::nonNull(Type::boolean()),
                'message' => Type::nonNull(Type::string()),
            ]
        ]);

        // Input types
        self::$types['DestinationInput'] = new InputObjectType([
            'name' => 'DestinationInput',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'slug' => Type::string(),
                'icon' => Type::string(),
                'display_order' => Type::int(),
                'country' => Type::string(),
                'description' => Type::string(),
                'image_url' => Type::string(),
                'location' => Type::string(),
                'is_featured' => Type::boolean(),
                'status' => Type::string(),
                'meta_title' => Type::string(),
                'meta_description' => Type::string(),
            ]
        ]);

        self::$types['TeamMemberInput'] = new InputObjectType([
            'name' => 'TeamMemberInput',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'position' => Type::nonNull(Type::string()),
                'bio' => Type::string(),
                'photo_url' => Type::string(),
                'email' => Type::string(),
                'phone' => Type::string(),
                'facebook' => Type::string(),
                'twitter' => Type::string(),
                'linkedin' => Type::string(),
                'instagram' => Type::string(),
                'display_order' => Type::int(),
                'status' => Type::string(),
            ]
        ]);

        self::$types['TestimonialInput'] = new InputObjectType([
            'name' => 'TestimonialInput',
            'fields' => [
                'client_name' => Type::nonNull(Type::string()),
                'client_position' => Type::string(),
                'client_photo' => Type::string(),
                'rating' => Type::nonNull(Type::int()),
                'testimonial_text' => Type::nonNull(Type::string()),
                'is_featured' => Type::boolean(),
                'status' => Type::string(),
                'destination' => Type::string(),
                'display_order' => Type::int()
            ]
        ]);

        self::$types['InquiryInput'] = new InputObjectType([
            'name' => 'InquiryInput',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'email' => Type::string(),
                'phone' => Type::nonNull(Type::string()),
                'subject' => Type::string(),
                'message' => Type::nonNull(Type::string()),
            ]
        ]);

        self::$types['InquiryUpdateInput'] = new InputObjectType([
            'name' => 'InquiryUpdateInput',
            'fields' => [
                'status' => Type::string(),
                'admin_notes' => Type::string(),
            ]
        ]);

        self::$types['BookingInput'] = new InputObjectType([
            'name' => 'BookingInput',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'email' => Type::string(),
                'phone' => Type::nonNull(Type::string()),
                'from_airport' => Type::nonNull(Type::string()),
                'to_airport' => Type::nonNull(Type::string()),
                'departure_date' => Type::nonNull(Type::string()),
                'return_date' => Type::string(),
                'adults' => Type::nonNull(Type::int()),
                'children' => Type::int(),
                'message' => Type::string(),
            ]
        ]);

        self::$types['BookingUpdateInput'] = new InputObjectType([
            'name' => 'BookingUpdateInput',
            'fields' => [
                'status' => Type::string(),
            ]
        ]);

        self::$types['OfferInput'] = new InputObjectType([
            'name' => 'OfferInput',
            'fields' => [
                'title' => Type::nonNull(Type::string()),
                'description' => Type::string(),
                'discount_percentage' => Type::float(),
                'discount_amount' => Type::float(),
                'code' => Type::string(),
                'valid_from' => Type::string(),
                'display_order' => Type::int(),
                'valid_until' => Type::string(),
                'status' => Type::string(),
                'image_url' => Type::string(),
            ]
        ]);

        self::$types['PartnerInput'] = new InputObjectType([
            'name' => 'PartnerInput',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'logo_url' => Type::string(),
                'website' => Type::string(),
                'display_order' => Type::int(),
                'status' => Type::string(),
            ]
        ]);

        self::$types['SetupAdminInput'] = new InputObjectType([
            'name' => 'SetupAdminInput',
            'fields' => [
                'username' => Type::nonNull(Type::string()),
                'email' => Type::nonNull(Type::string()),
                'password' => Type::nonNull(Type::string()),
                'full_name' => Type::nonNull(Type::string()),
            ]
        ]);
    }

    public function getQueryType()
    {
        $queryResolver = new QueryResolver();

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'settings' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Setting']))),
                    'resolve' => [$queryResolver, 'settings']
                ],
                'setting' => [
                    'type' => self::$types['Setting'],
                    'args' => ['key' => Type::nonNull(Type::string())],
                    'resolve' => [$queryResolver, 'setting']
                ],
                'destinations' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Destination']))),
                    'args' => [
                        'status' => Type::string(),
                        'is_featured' => Type::boolean()
                    ],
                    'resolve' => [$queryResolver, 'destinations']
                ],
                'destination' => [
                    'type' => self::$types['Destination'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'destination']
                ],
                'teamMembers' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['TeamMember']))),
                    'args' => ['status' => Type::string()],
                    'resolve' => [$queryResolver, 'teamMembers']
                ],
                'teamMember' => [
                    'type' => self::$types['TeamMember'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'teamMember']
                ],
                'testimonials' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Testimonial']))),
                    'args' => [
                        'status' => Type::string(),
                        'is_featured' => Type::boolean()
                    ],
                    'resolve' => [$queryResolver, 'testimonials']
                ],
                'testimonial' => [
                    'type' => self::$types['Testimonial'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'testimonial']
                ],
                'inquiries' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Inquiry']))),
                    'args' => ['status' => Type::string()],
                    'resolve' => [$queryResolver, 'inquiries']
                ],
                'inquiry' => [
                    'type' => self::$types['Inquiry'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'inquiry']
                ],
                'newsletterSubscribers' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['NewsletterSubscriber']))),
                    'resolve' => [$queryResolver, 'newsletterSubscribers']
                ],
                'bookings' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Booking']))),
                    'args' => ['status' => Type::string()],
                    'resolve' => [$queryResolver, 'bookings']
                ],
                'booking' => [
                    'type' => self::$types['Booking'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'booking']
                ],
                'offers' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Offer']))),
                    'args' => ['status' => Type::string()],
                    'resolve' => [$queryResolver, 'offers']
                ],
                'offer' => [
                    'type' => self::$types['Offer'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'offer']
                ],
                'partners' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(self::$types['Partner']))),
                    'args' => ['status' => Type::string()],
                    'resolve' => [$queryResolver, 'partners']
                ],
                'partner' => [
                    'type' => self::$types['Partner'],
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$queryResolver, 'partner']
                ],
                'checkSetup' => [
                    'type' => Type::nonNull(self::$types['SetupResponse']),
                    'resolve' => [$queryResolver, 'checkSetup']
                ],
                'profile' => [
                    'type' => self::$types['Admin'],
                    'resolve' => [$queryResolver, 'profile']
                ],
            ]
        ]);
    }

    public function getMutationType()
    {
        $mutationResolver = new MutationResolver();

        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'updateSetting' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'key' => Type::nonNull(Type::string()),
                        'value' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [$mutationResolver, 'updateSetting']
                ],
                'createDestination' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['DestinationInput'])],
                    'resolve' => [$mutationResolver, 'createDestination']
                ],
                'updateDestination' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['DestinationInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateDestination']
                ],
                'deleteDestination' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteDestination']
                ],
                'createTeamMember' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['TeamMemberInput'])],
                    'resolve' => [$mutationResolver, 'createTeamMember']
                ],
                'updateTeamMember' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['TeamMemberInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateTeamMember']
                ],
                'deleteTeamMember' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteTeamMember']
                ],
                'createTestimonial' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['TestimonialInput'])],
                    'resolve' => [$mutationResolver, 'createTestimonial']
                ],
                'updateTestimonial' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['TestimonialInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateTestimonial']
                ],
                'deleteTestimonial' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteTestimonial']
                ],
                'submitInquiry' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['InquiryInput'])],
                    'resolve' => [$mutationResolver, 'submitInquiry']
                ],
                'updateInquiry' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['InquiryUpdateInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateInquiry']
                ],
                'deleteInquiry' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteInquiry']
                ],
                'subscribeNewsletter' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'email' => Type::nonNull(Type::string()),
                        'name' => Type::string()
                    ],
                    'resolve' => [$mutationResolver, 'subscribeNewsletter']
                ],
                'createBooking' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['BookingInput'])],
                    'resolve' => [$mutationResolver, 'createBooking']
                ],
                'updateBooking' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['BookingUpdateInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateBooking']
                ],
                'deleteBooking' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteBooking']
                ],
                'createOffer' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['OfferInput'])],
                    'resolve' => [$mutationResolver, 'createOffer']
                ],
                'updateOffer' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['OfferInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updateOffer']
                ],
                'deleteOffer' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deleteOffer']
                ],
                'createPartner' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['PartnerInput'])],
                    'resolve' => [$mutationResolver, 'createPartner']
                ],
                'updatePartner' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'input' => Type::nonNull(self::$types['PartnerInput'])
                    ],
                    'resolve' => [$mutationResolver, 'updatePartner']
                ],
                'deletePartner' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['id' => Type::nonNull(Type::int())],
                    'resolve' => [$mutationResolver, 'deletePartner']
                ],
                'setupAdmin' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => ['input' => Type::nonNull(self::$types['SetupAdminInput'])],
                    'resolve' => [$mutationResolver, 'setupAdmin']
                ],
                'login' => [
                    'type' => Type::nonNull(self::$types['AuthResponse']),
                    'args' => [
                        'username' => Type::nonNull(Type::string()),
                        'password' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [$mutationResolver, 'login']
                ],
                'logout' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'resolve' => [$mutationResolver, 'logout']
                ],
                'changePassword' => [
                    'type' => Type::nonNull(self::$types['MutationResponse']),
                    'args' => [
                        'currentPassword' => Type::nonNull(Type::string()),
                        'newPassword' => Type::nonNull(Type::string()),
                        'confirmPassword' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [$mutationResolver, 'changePassword']
                ],
            ]
        ]);
    }

    public static function getType($name)
    {
        return self::$types[$name] ?? null;
    }
}
