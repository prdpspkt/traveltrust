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

class QueryResolver
{
    /**
     * Get all settings
     */
    public function settings($rootValue, $args, $context)
    {
        $model = new SettingsModel();
        $settings = $model->findAll();

        // Map to GraphQL format
        $result = [];
        foreach ($settings as $setting) {
            $result[] = [
                'key' => $setting['setting_key'],
                'value' => $setting['setting_value'],
                'created_at' => $setting['updated_at'] ?? null,
                'updated_at' => $setting['updated_at'] ?? null,
            ];
        }

        return $result;
    }

    /**
     * Get setting by key
     */
    public function setting($rootValue, $args, $context)
    {
        $model = new SettingsModel();
        $setting = $model->where('setting_key', $args['key'])->first();

        if (!$setting) {
            return null;
        }

        return [
            'key' => $setting['setting_key'],
            'value' => $setting['setting_value'],
            'created_at' => $setting['updated_at'] ?? null,
            'updated_at' => $setting['updated_at'] ?? null,
        ];
    }

    /**
     * Get all destinations
     */
    public function destinations($rootValue, $args, $context)
    {
        $model = new DestinationModel();
        $status = $args['status'] ?? null;
        $featured = $args['is_featured'] ?? null;

        $destinations = $model->getAll($status, $featured);

        // Map to GraphQL format
        $result = [];
        foreach ($destinations as $destination) {
            $result[] = $this->mapDestination($destination);
        }

        return $result;
    }

    /**
     * Get destination by ID
     */
    public function destination($rootValue, $args, $context)
    {
        $model = new DestinationModel();
        $destination = $model->find($args['id']);

        if (!$destination) {
            return null;
        }

        return $this->mapDestination($destination);
    }

    /**
     * Get all team members
     */
    public function teamMembers($rootValue, $args, $context)
    {
        $model = new TeamModel();
        $status = $args['status'] ?? null;

        $members = $model->getAll($status);

        // Map to GraphQL format
        $result = [];
        foreach ($members as $member) {
            $result[] = $this->mapTeamMember($member);
        }

        return $result;
    }

    /**
     * Get team member by ID
     */
    public function teamMember($rootValue, $args, $context)
    {
        $model = new TeamModel();
        $member = $model->find($args['id']);

        if (!$member) {
            return null;
        }

        return $this->mapTeamMember($member);
    }

    /**
     * Get all testimonials
     */
    public function testimonials($rootValue, $args, $context)
    {
        $model = new TestimonialModel();
        $status = $args['status'] ?? null;
        $featured = $args['featured'] ?? null;

        $testimonials = $model->getAll($status, $featured);

        // Map to GraphQL format
        $result = [];
        foreach ($testimonials as $testimonial) {
            $result[] = $this->mapTestimonial($testimonial);
        }

        return $result;
    }

    /**
     * Get testimonial by ID
     */
    public function testimonial($rootValue, $args, $context)
    {
        $model = new TestimonialModel();
        $testimonial = $model->find($args['id']);

        if (!$testimonial) {
            return null;
        }

        return $this->mapTestimonial($testimonial);
    }

    /**
     * Get all inquiries (admin only)
     */
    public function inquiries($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new InquiryModel();
        $status = $args['status'] ?? null;

        $inquiries = $model->getAll($status);

        // Map to GraphQL format
        $result = [];
        foreach ($inquiries as $inquiry) {
            $result[] = $this->mapInquiry($inquiry);
        }

        return $result;
    }

    /**
     * Get inquiry by ID (admin only)
     */
    public function inquiry($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new InquiryModel();
        $inquiry = $model->find($args['id']);

        if (!$inquiry) {
            return null;
        }

        return $this->mapInquiry($inquiry);
    }

    /**
     * Get all newsletter subscribers (admin only)
     */
    public function newsletterSubscribers($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new NewsletterModel();
        $subscribers = $model->findAll();

        return $subscribers;
    }

    /**
     * Get all bookings (admin only)
     */
    public function bookings($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new BookingModel();
        $status = $args['status'] ?? null;

        $bookings = $model->getAll($status);

        // Map to GraphQL format
        $result = [];
        foreach ($bookings as $booking) {
            $result[] = $this->mapBooking($booking);
        }

        return $result;
    }

    /**
     * Get booking by ID (admin only)
     */
    public function booking($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new BookingModel();
        $booking = $model->find($args['id']);

        if (!$booking) {
            return null;
        }

        return $this->mapBooking($booking);
    }

    /**
     * Get all offers
     */
    public function offers($rootValue, $args, $context)
    {
        $model = new OfferModel();
        $builder = $model->builder();

        $status = $args['status'] ?? null;
        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        $offers = $builder->orderBy('display_order', 'ASC')->get()->getResultArray();

        // Map to GraphQL format
        $result = [];
        foreach ($offers as $offer) {
            $result[] = $this->mapOffer($offer);
        }

        return $result;
    }

    /**
     * Get offer by ID
     */
    public function offer($rootValue, $args, $context)
    {
        $model = new OfferModel();
        $offer = $model->find($args['id']);

        if (!$offer) {
            return null;
        }

        return $this->mapOffer($offer);
    }

    /**
     * Get all partners
     */
    public function partners($rootValue, $args, $context)
    {
        $model = new PartnerModel();
        $builder = $model->builder();

        $status = $args['status'] ?? null;
        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        $partners = $builder->orderBy('display_order', 'ASC')->get()->getResultArray();

        // Map to GraphQL format
        $result = [];
        foreach ($partners as $partner) {
            $result[] = $this->mapPartner($partner);
        }

        return $result;
    }

    /**
     * Get partner by ID
     */
    public function partner($rootValue, $args, $context)
    {
        $model = new PartnerModel();
        $partner = $model->find($args['id']);

        if (!$partner) {
            return null;
        }

        return $this->mapPartner($partner);
    }

    /**
     * Check if setup is needed
     */
    public function checkSetup($rootValue, $args, $context)
    {
        $model = new AdminModel();
        $adminCount = $model->countAll();

        return [
            'status' => 'success',
            'needsSetup' => $adminCount === 0,
            'message' => $adminCount === 0 ? 'Setup required' : 'System already configured'
        ];
    }

    /**
     * Get admin profile (admin only)
     */
    public function profile($rootValue, $args, $context)
    {
        // Check authentication
        if (!isset($context['session']) || !$context['session']->get('isLoggedIn')) {
            throw new \Exception('Unauthorized');
        }

        $model = new AdminModel();
        $admin = $model->find($context['session']->get('admin_id'));

        if (!$admin) {
            return null;
        }

        return $this->mapAdmin($admin);
    }

    // Helper methods to map database fields to GraphQL fields

    private function mapDestination($destination)
    {
        return [
            'id' => $destination['id'],
            'name' => $destination['name'],
            'icon' => $destination['icon'],
            'description' => $destination['description'],
            'image_url' => $destination['image_url'],
            'country' => $destination['country'],
            'is_featured' => (bool)($destination['is_featured']),
            'status' => $destination['status'],
            'created_at' => $destination['created_at'],
            'updated_at' => $destination['updated_at'],
        ];
    }

    private function mapTeamMember($member)
    {
        // Combine social links into JSON
        $socialLinks = json_encode([
            'facebook' => $member['facebook'] ?? null,
            'twitter' => $member['twitter'] ?? null,
            'linkedin' => $member['linkedin'] ?? null,
            'instagram' => $member['instagram'] ?? null,
        ]);

        return [
            'id' => $member['id'],
            'name' => $member['name'],
            'position' => $member['position'],
            'bio' => $member['bio'] ?? null,
            'photo_url' => $member['photo_url'] ?? null,
            'email' => $member['email'] ?? null,
            'phone' => $member['phone'] ?? null,
            'social_links' => $socialLinks,
            'display_order' => $member['display_order'] ?? 0,
            'status' => $member['status'],
            'created_at' => $member['created_at'] ?? null,
            'updated_at' => $member['updated_at'] ?? null,
        ];
    }

    private function mapTestimonial($testimonial)
    {
        return [
            'id' => $testimonial['id'],
            'client_name' => $testimonial['client_name'],
            'client_position' => $testimonial['client_position'] ?? null,
            'client_photo' => $testimonial['client_photo'] ?? null,
            'rating' => (int)$testimonial['rating'],
            'testimonial_text' => $testimonial['testimonial_text'],
            'destination' => $testimonial['destination'] ?? null,
            'is_featured' => (bool)($testimonial['is_featured'] ?? false),
            'display_order' => $testimonial['display_order'] ?? 0,
            'status' => $testimonial['status'],
            'created_at' => $testimonial['created_at'] ?? null,
            'updated_at' => $testimonial['updated_at'] ?? null,
        ];
    }

    private function mapInquiry($inquiry)
    {
        return [
            'id' => $inquiry['id'],
            'name' => $inquiry['name'],
            'email' => $inquiry['email'],
            'phone' => $inquiry['phone'] ?? null,
            'subject' => $inquiry['subject'] ?? null,
            'message' => $inquiry['message'],
            'status' => $inquiry['status'],
            'created_at' => $inquiry['created_at'] ?? null,
            'updated_at' => $inquiry['updated_at'] ?? null,
        ];
    }

    private function mapBooking($booking)
    {
        // Note: Bookings table doesn't have destination_id in the migration
        // The TypeRegistry expects it, but it's not in the actual schema
        return [
            'id' => $booking['id'],
            'name' => $booking['name'],
            'email' => $booking['email'],
            'phone' => $booking['phone'],
            'from_airport' => $booking['from_airport'],
            'to_airport' => $booking['to_airport'],
            'departure_date' => $booking['departure_date'],
            'return_date' => $booking['return_date'],
            'adults' => $booking['adults'],
            'children' => $booking['children'],
            'message' => $booking['message'],
            'status' => $booking['status'],
            'created_at' => $booking['created_at'] ?? null,
            'updated_at' => $booking['updated_at'] ?? null
        ];
    }

    private function mapOffer($offer)
    {
        return [
            'id' => $offer['id'],
            'title' => $offer['title'],
            'description' => $offer['description'] ?? null,
            'image_url' => $offer['image_url'] ?? null,
            'display_order' => $offer['display_order'] ?? 0,
            'discount_percentage' => null, // Not in database
            'discount_amount' => null, // Not in database
            'code' => null, // Not in database
            'valid_from' => null, // Not in database
            'valid_until' => null, // Not in database
            'status' => $offer['status'],
            'created_at' => $offer['created_at'] ?? null,
            'updated_at' => $offer['updated_at'] ?? null,
        ];
    }

    private function mapPartner($partner)
    {
        return [
            'id' => $partner['id'],
            'name' => $partner['name'],
            'logo_url' => $partner['logo_url'] ?? null,
            'website' => $partner['website'] ?? null,
            'description' => null, // Not in database
            'display_order' => $partner['display_order'] ?? 0,
            'status' => $partner['status'],
            'created_at' => $partner['created_at'] ?? null,
            'updated_at' => $partner['updated_at'] ?? null,
        ];
    }

    private function mapAdmin($admin)
    {
        return [
            'id' => $admin['id'],
            'username' => $admin['username'],
            'email' => $admin['email'],
            'full_name' => $admin['full_name'],
            'role' => $admin['role'],
            'status' => $admin['status'],
            'last_login' => $admin['last_login'] ?? null,
            'created_at' => $admin['created_at'] ?? null,
        ];
    }
}
