<?php

namespace App\GraphQL\Resolvers;

use App\Models\SettingsModel;
use App\Models\DestinationModel;
use App\Models\TeamModel;
use App\Models\TestimonialModel;
use App\Models\InquiryModel;
use App\Models\NewsletterModel;
use App\Models\BookingModel;
use App\Models\OfferModel;
use App\Models\PartnerModel;
use App\Models\AdminModel;
use App\Helpers\ImageHelper;

class MutationResolver
{
    /**
     * Update setting (admin only)
     */
    public function updateSetting($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new SettingsModel();
        $result = $model->updateSetting($args['key'], $args['value']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Setting updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update setting',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Create destination (admin only)
     */
    public function createDestination($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new DestinationModel();
        $input = $args['input'];

        // Process image if provided
        $imageUrl = $input['image_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'name' => $input['name'],
            'country' => $input['country'] ?? '', // Map location to country
            'description' => $input['description'] ?? null,
            'image_url' => $processedImage,
            'icon' => null, // Not in GraphQL input
            'is_featured' => isset($input['featured']) ? (int)$input['featured'] : 0,
            'display_order' => 0,
            'status' => $input['status'] ?? 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Destination created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create destination',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update destination (admin only)
     */
    public function updateDestination($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new DestinationModel();
        $input = $args['input'];
        $id = $args['id'];

        // Process image if provided
        $imageUrl = $input['image_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'name' => $input['name'],
            'country' => $input['country'] ?? '',
            'description' => $input['description'] ?? null,
            'icon' => $input['icon'] ?? null,
            'is_featured' => $input['is_featured'],
            'display_order' => $input['display_order'],
            'status' => $input['status'],
        ];

        // Only update image if provided
        if ($processedImage !== null) {
            $data['image_url'] = $processedImage;
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Destination updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update destination',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete destination (admin only)
     */
    public function deleteDestination($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new DestinationModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Destination deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete destination',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Create team member (admin only)
     */
    public function createTeamMember($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TeamModel();
        $input = $args['input'];

        // Process image if provided
        $imageUrl = $input['photo_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'name' => $input['name'],
            'position' => $input['position'],
            'bio' => $input['bio'] ?? null,
            'photo_url' => $processedImage,
            'email' => $input['email'] ?? null,
            'phone' => $input['phone'] ?? null,
            'facebook' => $input['facebook'] ?? null,
            'twitter' => $input['twitter'] ?? null,
            'linkedin' => $input['linkedin'] ?? null,
            'instagram' => $input['instagram'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Team member created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create team member',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update team member (admin only)
     */
    public function updateTeamMember($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TeamModel();
        $input = $args['input'];
        $id = $args['id'];

        // Process image if provided
        $imageUrl = $input['photo_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'name' => $input['name'],
            'position' => $input['position'],
            'bio' => $input['bio'] ?? null,
            'email' => $input['email'] ?? null,
            'phone' => $input['phone'] ?? null,
            'facebook' => $input['facebook'] ?? null,
            'twitter' => $input['twitter'] ?? null,
            'linkedin' => $input['linkedin'] ?? null,
            'instagram' => $input['instagram'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        // Only update image if provided
        if ($processedImage !== null) {
            $data['photo_url'] = $processedImage;
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Team member updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update team member',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete team member (admin only)
     */
    public function deleteTeamMember($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TeamModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Team member deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete team member',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Create testimonial (admin only)
     */
    public function createTestimonial($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TestimonialModel();
        $input = $args['input'];

        // Process image if provided
        $imageUrl = $input['client_photo'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'client_name' => $input['client_name'],
            'client_position' => $input['client_position'] ?? null, // Map location to position
            'client_photo' => $processedImage,
            'testimonial_text' => $input['testimonial_text'],
            'rating' => $input['rating'],
            'destination' => $input['destination'],
            'is_featured' => isset($input['featured']) ? (int)$input['featured'] : false,
            'display_order' => 0,
            'status' => $input['status'] ?? 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Testimonial created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create testimonial',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update testimonial (admin only)
     */
    public function updateTestimonial($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TestimonialModel();
        $input = $args['input'];
        $id = $args['id'];

        // Process image if provided
        $imageUrl = $input['client_photo'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'client_name' => $input['client_name'],
            'client_position' => $input['client_position'] ?? null, // Map location to position
            'client_photo' => $processedImage,
            'testimonial_text' => $input['testimonial_text'],
            'rating' => $input['rating'],
            'destination' => $input['destination'],
            'is_featured' => isset($input['is_featured']) ? (int)$input['is_featured'] : false,
            'display_order' => 0,
            'status' => $input['status'] ?? 'active',
        ];

        // Only update image if provided
        if ($processedImage !== null) {
            $data['client_photo'] = $processedImage;
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Testimonial updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update testimonial',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete testimonial (admin only)
     */
    public function deleteTestimonial($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new TestimonialModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Testimonial deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete testimonial',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Submit inquiry (public)
     * @throws \ReflectionException
     */
    public function submitInquiry($rootValue, $args, $context)
    {
        $model = new InquiryModel();
        $input = $args['input'];

        $data = [
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'],
            'subject' => $input['subject'],
            'message' => $input['message'],
            'status' => 'new',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Inquiry submitted successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to submit inquiry',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update inquiry (admin only)
     */
    public function updateInquiry($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new InquiryModel();
        $input = $args['input'];
        $id = $args['id'];

        $data = [];
        if (isset($input['status'])) {
            $data['status'] = $input['status'];
        }
        if (isset($input['admin_notes'])) {
            $data['admin_notes'] = $input['admin_notes'];
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Inquiry updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update inquiry',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete inquiry (admin only)
     */
    public function deleteInquiry($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new InquiryModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Inquiry deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete inquiry',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Subscribe to newsletter (public)
     */
    public function subscribeNewsletter($rootValue, $args, $context)
    {
        $model = new NewsletterModel();
        $email = $args['email'];
        $name = $args['name'] ?? '';

        $result = $model->subscribe($email, $name);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Successfully subscribed to newsletter',
                'data' => null,
                'errors' => null
            ];
        }

        // Check if already subscribed
        $existing = $model->where('email', $email)->first();
        if ($existing && $existing['status'] === 'active') {
            return [
                'status' => 'error',
                'message' => 'Email already subscribed',
                'data' => null,
                'errors' => json_encode(['email' => 'Email already subscribed'])
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to subscribe',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Create booking (public)
     */
    public function createBooking($rootValue, $args, $context)
    {
        $model = new BookingModel();
        $input = $args['input'];

        $data = [
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'],
            'from_airport' => $input['from_airport'],
            'to_airport' => $input['to_airport'],
            'departure_date' => $input['departure_date'],
            'return_date' => $input['return_date'] ?? null,
            'adults' => $input['adults'],
            'children' => $input['children'] ?? 0,
            'message' => $input['message'] ?? null,
            'status' => 'pending',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Booking created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create booking',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update booking (admin only)
     */
    public function updateBooking($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new BookingModel();
        $input = $args['input'];
        $id = $args['id'];

        $data = [];
        if (isset($input['status'])) {
            $data['status'] = $input['status'];
        }
        // Note: admin_notes field doesn't exist in bookings table

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Booking updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update booking',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete booking (admin only)
     */
    public function deleteBooking($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new BookingModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Booking deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete booking',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Create offer (admin only)
     */
    public function createOffer($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new OfferModel();
        $input = $args['input'];

        // Process image if provided
        $imageUrl = $input['image_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'title' => $input['title'],
            'description' => $input['description'] ?? null,
            'image_url' => $processedImage,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Offer created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create offer',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update offer (admin only)
     */
    public function updateOffer($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new OfferModel();
        $input = $args['input'];
        $id = $args['id'];

        // Process image if provided
        $imageUrl = $input['image_url'] ?? null;
        $processedImage = $imageUrl ? ImageHelper::processImage($imageUrl) : null;

        $data = [
            'title' => $input['title'],
            'description' => $input['description'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        // Only update image if provided
        if ($processedImage !== null) {
            $data['image_url'] = $processedImage;
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Offer updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update offer',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete offer (admin only)
     */
    public function deleteOffer($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new OfferModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Offer deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete offer',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Create partner (admin only)
     */
    public function createPartner($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new PartnerModel();
        $input = $args['input'];

        // Process logo if provided
        $logoUrl = $input['logo_url'] ?? null;
        $processedLogo = $logoUrl ? ImageHelper::processImage($logoUrl) : null;
        $data = [
            'name' => $input['name'],
            'logo_url' => $processedLogo,
            'website' => $input['website'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Partner created successfully',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create partner',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Update partner (admin only)
     */
    public function updatePartner($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new PartnerModel();
        $input = $args['input'];
        $id = $args['id'];

        // Process logo if provided
        $logoUrl = $input['logo_url'] ?? null;
        $processedLogo = $logoUrl ? ImageHelper::processImage($logoUrl) : null;

        $data = [
            'name' => $input['name'],
            'website' => $input['website'] ?? null,
            'display_order' => $input['display_order'] ?? 0,
            'status' => $input['status'] ?? 'active',
        ];

        // Only update logo if provided
        if ($processedLogo !== null) {
            $data['logo_url'] = $processedLogo;
        }

        $result = $model->update($id, $data);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Partner updated successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to update partner',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Delete partner (admin only)
     */
    public function deletePartner($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $model = new PartnerModel();
        $result = $model->delete($args['id']);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Partner deleted successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to delete partner',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Setup admin (only works if no admin exists)
     */
    public function setupAdmin($rootValue, $args, $context)
    {
        $model = new AdminModel();

        // Check if admin already exists
        if ($model->countAll() > 0) {
            return [
                'status' => 'error',
                'message' => 'Setup already completed. Admin user exists.',
                'data' => null,
                'errors' => json_encode(['setup' => 'Setup already completed'])
            ];
        }

        $input = $args['input'];

        $data = [
            'username' => $input['username'],
            'email' => $input['email'],
            'password' => password_hash($input['password'], PASSWORD_DEFAULT),
            'full_name' => $input['full_name'],
            'role' => 'admin',
            'status' => 'active',
        ];

        $id = $model->insert($data);

        if ($id) {
            return [
                'status' => 'success',
                'message' => 'Admin user created successfully. You can now login.',
                'data' => json_encode(['id' => $id]),
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create admin user',
            'data' => null,
            'errors' => json_encode($model->errors())
        ];
    }

    /**
     * Login
     */
    public function login($rootValue, $args, $context)
    {
        $username = $args['username'];
        $password = $args['password'];

        $model = new AdminModel();
        $user = $model->authenticate($username, $password);

        if ($user) {
            // Set session
            $session = $context['session'];
            $session->set([
                'admin_id' => $user['id'],
                'admin_username' => $user['username'],
                'admin_role' => $user['role'],
                'isLoggedIn' => true
            ]);

            // Update last login
            $model->updateLastLogin($user['id']);

            // Remove password from response
            unset($user['password']);

            return [
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'full_name' => $user['full_name'],
                    'role' => $user['role'],
                    'status' => $user['status'],
                    'last_login' => $user['last_login'] ?? null,
                    'created_at' => $user['created_at'] ?? null,
                ]
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Invalid credentials',
            'data' => null
        ];
    }

    /**
     * Logout
     */
    public function logout($rootValue, $args, $context)
    {
        $session = $context['session'];
        $session->destroy();

        return [
            'status' => 'success',
            'message' => 'Logout successful',
            'data' => null,
            'errors' => null
        ];
    }

    /**
     * Change password (admin only)
     */
    public function changePassword($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized',
                'data' => null,
                'errors' => json_encode(['auth' => 'Unauthorized'])
            ];
        }

        $currentPassword = $args['currentPassword'];
        $newPassword = $args['newPassword'];
        $confirmPassword = $args['confirmPassword'];

        // Check if passwords match
        if ($newPassword !== $confirmPassword) {
            return [
                'status' => 'error',
                'message' => 'New password and confirmation do not match',
                'data' => null,
                'errors' => json_encode(['confirm_password' => 'Passwords do not match'])
            ];
        }

        // Check password length
        if (strlen($newPassword) < 8) {
            return [
                'status' => 'error',
                'message' => 'Password must be at least 8 characters long',
                'data' => null,
                'errors' => json_encode(['new_password' => 'Password must be at least 8 characters'])
            ];
        }

        $model = new AdminModel();
        $userId = $context['session']->get('admin_id');
        $user = $model->find($userId);

        if (!$user) {
            return [
                'status' => 'error',
                'message' => 'User not found',
                'data' => null,
                'errors' => json_encode(['user' => 'User not found'])
            ];
        }

        // Verify current password
        if (!password_verify($currentPassword, $user['password'])) {
            return [
                'status' => 'error',
                'message' => 'Current password is incorrect',
                'data' => null,
                'errors' => json_encode(['current_password' => 'Current password is incorrect'])
            ];
        }

        // Update password
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $result = $model->update($userId, ['password' => $newPasswordHash]);

        if ($result) {
            return [
                'status' => 'success',
                'message' => 'Password changed successfully',
                'data' => null,
                'errors' => null
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to change password',
            'data' => null,
            'errors' => null
        ];
    }
}
