import { gql } from '@apollo/client';

// ==================== QUERIES ====================

// Settings
export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      key
      value
      created_at
      updated_at
    }
  }
`;

export const GET_SETTING = gql`
  query GetSetting($key: String!) {
    setting(key: $key) {
      key
      value
      created_at
      updated_at
    }
  }
`;

// Destinations
export const GET_DESTINATIONS = gql`
  query GetDestinations($status: String, $is_featured: Boolean) {
    destinations(status: $status, is_featured: $is_featured) {
      id
      name
      country
      description
      image_url
      icon
      is_featured
      status
      created_at
      updated_at
    }
  }
`;

export const GET_DESTINATION = gql`
  query GetDestination($id: Int!) {
    destination(id: $id) {
      id
      name
      slug
      description
      image_url
      country
      is_featured
      status
      created_at
      updated_at
    }
  }
`;

// Team Members
export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($status: String) {
    teamMembers(status: $status) {
      id
      name
      position
      bio
      photo_url
      email
      phone
      facebook
      twitter
      linkedin
      instagram
      display_order
      status
      created_at
      updated_at
    }
  }
`;

export const GET_TEAM_MEMBER = gql`
  query GetTeamMember($id: Int!) {
    teamMember(id: $id) {
      id
      name
      position
      bio
      photo_url
      email
      phone
      facebook
      twitter
      linkedin
      instagram
      display_order
      status
      created_at
      updated_at
    }
  }
`;

// Testimonials
export const GET_TESTIMONIALS = gql`
  query GetTestimonials($status: String, $featured: Boolean) {
    testimonials(status: $status, is_featured: $featured) {
      id
      client_name
      client_position
      client_photo
      destination
      rating
      testimonial_text
      is_featured
      status
      created_at
      updated_at
    }
  }
`;

export const GET_TESTIMONIAL = gql`
  query GetTestimonial($id: Int!) {
    testimonial(id: $id) {
      id
      client_name
      client_position
      client_photo
      rating
      testimonial_text
      is_featured
      status
      created_at
      updated_at
    }
  }
`;

// Inquiries
export const GET_INQUIRIES = gql`
  query GetInquiries($status: String) {
    inquiries(status: $status) {
      id
      name
      email
      phone
      subject
      message
      status
      created_at
      updated_at
    }
  }
`;

export const GET_INQUIRY = gql`
  query GetInquiry($id: Int!) {
    inquiry(id: $id) {
      id
      name
      email
      phone
      subject
      message
      status
      created_at
      updated_at
    }
  }
`;

// Newsletter
export const GET_NEWSLETTER_SUBSCRIBERS = gql`
  query GetNewsletterSubscribers {
    newsletterSubscribers {
      id
      email
      name
      status
      subscribed_at
      unsubscribed_at
    }
  }
`;

// Bookings
export const GET_BOOKINGS = gql`
  query GetBookings($status: String) {
    bookings(status: $status) {
      id
      name
      email
      phone
      from_airport
      to_airport
      departure_date
      return_date
      adults
      children
      status
      message
      created_at
      updated_at
    }
  }
`;

export const GET_BOOKING = gql`
  query GetBooking($id: Int!) {
    booking(id: $id) {
      id
      name
      email
      phone
      departure_date
      return_date
      from_airport
      to_airport
      message
      adults
      children
      status
      created_at
      updated_at
    }
  }
`;

// Offers
export const GET_OFFERS = gql`
  query GetOffers($status: String) {
    offers(status: $status) {
      id
      title
      description
      discount_percentage
      discount_amount
      code
      image_url
      valid_from
      valid_until
      status
      created_at
      updated_at
    }
  }
`;

export const GET_OFFER = gql`
  query GetOffer($id: Int!) {
    offer(id: $id) {
      id
      title
      description
      discount_percentage
      discount_amount
      code
      valid_from
      valid_until
      status
      created_at
      updated_at
    }
  }
`;

// Partners
export const GET_PARTNERS = gql`
  query GetPartners($status: String) {
    partners(status: $status) {
      id
      name
      logo_url
      website
      description
      display_order
      status
      created_at
      updated_at
    }
  }
`;

export const GET_PARTNER = gql`
  query GetPartner($id: Int!) {
    partner(id: $id) {
      id
      name
      logo_url
      website
      description
      display_order
      status
      created_at
      updated_at
    }
  }
`;

// Auth
export const CHECK_SETUP = gql`
  query CheckSetup {
    checkSetup {
      status
      needsSetup
      message
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      username
      email
      full_name
      role
      status
      last_login
      created_at
    }
  }
`;

// ==================== MUTATIONS ====================

// Settings
export const UPDATE_SETTING = gql`
  mutation UpdateSetting($key: String!, $value: String!) {
    updateSetting(key: $key, value: $value) {
      status
      message
      data
      errors
    }
  }
`;

// Destinations
export const CREATE_DESTINATION = gql`
  mutation CreateDestination($input: DestinationInput!) {
    createDestination(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_DESTINATION = gql`
  mutation UpdateDestination($id: Int!, $input: DestinationInput!) {
    updateDestination(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_DESTINATION = gql`
  mutation DeleteDestination($id: Int!) {
    deleteDestination(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Team Members
export const CREATE_TEAM_MEMBER = gql`
  mutation CreateTeamMember($input: TeamMemberInput!) {
    createTeamMember(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_TEAM_MEMBER = gql`
  mutation UpdateTeamMember($id: Int!, $input: TeamMemberInput!) {
    updateTeamMember(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_TEAM_MEMBER = gql`
  mutation DeleteTeamMember($id: Int!) {
    deleteTeamMember(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Testimonials
export const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial($input: TestimonialInput!) {
    createTestimonial(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation UpdateTestimonial($id: Int!, $input: TestimonialInput!) {
    updateTestimonial(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_TESTIMONIAL = gql`
  mutation DeleteTestimonial($id: Int!) {
    deleteTestimonial(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Inquiries
export const SUBMIT_INQUIRY = gql`
  mutation SubmitInquiry($input: InquiryInput!) {
    submitInquiry(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_INQUIRY = gql`
  mutation UpdateInquiry($id: Int!, $input: InquiryUpdateInput!) {
    updateInquiry(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_INQUIRY = gql`
  mutation DeleteInquiry($id: Int!) {
    deleteInquiry(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Newsletter
export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($email: String!, $name: String) {
    subscribeNewsletter(email: $email, name: $name) {
      status
      message
      data
      errors
    }
  }
`;

// Bookings
export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: Int!, $input: BookingUpdateInput!) {
    updateBooking(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: Int!) {
    deleteBooking(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Offers
export const CREATE_OFFER = gql`
  mutation CreateOffer($input: OfferInput!) {
    createOffer(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_OFFER = gql`
  mutation UpdateOffer($id: Int!, $input: OfferInput!) {
    updateOffer(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: Int!) {
    deleteOffer(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Partners
export const CREATE_PARTNER = gql`
  mutation CreatePartner($input: PartnerInput!) {
    createPartner(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const UPDATE_PARTNER = gql`
  mutation UpdatePartner($id: Int!, $input: PartnerInput!) {
    updatePartner(id: $id, input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const DELETE_PARTNER = gql`
  mutation DeletePartner($id: Int!) {
    deletePartner(id: $id) {
      status
      message
      data
      errors
    }
  }
`;

// Auth
export const SETUP_ADMIN = gql`
  mutation SetupAdmin($input: SetupAdminInput!) {
    setupAdmin(input: $input) {
      status
      message
      data
      errors
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      message
      data {
        id
        username
        email
        full_name
        role
        status
        last_login
        created_at
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      status
      message
      data
      errors
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      status
      message
      data
      errors
    }
  }
`;
