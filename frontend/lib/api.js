import client from './apollo-client';
import * as queries from './graphql';

// Settings API
export const getSettings = async () => {
  const { data } = await client.query({ query: queries.GET_SETTINGS });
  return { status: 'success', data: data.settings };
};

export const updateSetting = async (key, value) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_SETTING,
    variables: { key, value }
  });
  return data.updateSetting;
};

// Destinations API
export const getDestinations = async (status = 'active', featured) => {
  const { data } = await client.query({
    query: queries.GET_DESTINATIONS,
    variables: { status, featured }
  });
  return { status: 'success', data: data.destinations };
};

export const getDestination = async (id) => {
  const { data } = await client.query({
    query: queries.GET_DESTINATION,
    variables: { id }
  });
  return { status: 'success', data: data.destination };
};

export const createDestination = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_DESTINATION,
    variables: { input }
  });
  return data.createDestination;
};

export const updateDestination = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_DESTINATION,
    variables: { id, input }
  });
  return data.updateDestination;
};

export const deleteDestination = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_DESTINATION,
    variables: { id }
  });
  return data.deleteDestination;
};

// Team API
export const getTeamMembers = async (status = 'active') => {
  const { data } = await client.query({
    query: queries.GET_TEAM_MEMBERS,
    variables: { status }
  });
  return { status: 'success', data: data.teamMembers };
};

export const getTeamMember = async (id) => {
  const { data } = await client.query({
    query: queries.GET_TEAM_MEMBER,
    variables: { id }
  });
  return { status: 'success', data: data.teamMember };
};

export const createTeamMember = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_TEAM_MEMBER,
    variables: { input }
  });
  return data.createTeamMember;
};

export const updateTeamMember = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_TEAM_MEMBER,
    variables: { id, input }
  });
  return data.updateTeamMember;
};

export const deleteTeamMember = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_TEAM_MEMBER,
    variables: { id }
  });
  return data.deleteTeamMember;
};

// Testimonials API
export const getTestimonials = async (status = 'active', featured) => {
  const featuredBool = typeof featured === 'number' ? featured === 1 : featured;
  const { data } = await client.query({
    query: queries.GET_TESTIMONIALS,
    variables: { status, featured: featuredBool }
  });
  return { status: 'success', data: data.testimonials };
};

export const getTestimonial = async (id) => {
  const { data } = await client.query({
    query: queries.GET_TESTIMONIAL,
    variables: { id }
  });
  return { status: 'success', data: data.testimonial };
};

export const createTestimonial = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_TESTIMONIAL,
    variables: { input }
  });
  return data.createTestimonial;
};

export const updateTestimonial = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_TESTIMONIAL,
    variables: { id, input }
  });
  return data.updateTestimonial;
};

export const deleteTestimonial = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_TESTIMONIAL,
    variables: { id }
  });
  return data.deleteTestimonial;
};

// Inquiries API
export const submitInquiry = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.SUBMIT_INQUIRY,
    variables: { input }
  });
  return data.submitInquiry;
};

export const getInquiries = async (status) => {
  const { data } = await client.query({
    query: queries.GET_INQUIRIES,
    variables: { status }
  });
  return { status: 'success', data: data.inquiries };
};

export const getInquiry = async (id) => {
  const { data } = await client.query({
    query: queries.GET_INQUIRY,
    variables: { id }
  });
  return { status: 'success', data: data.inquiry };
};

export const updateInquiry = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_INQUIRY,
    variables: { id, input }
  });
  return data.updateInquiry;
};

export const deleteInquiry = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_INQUIRY,
    variables: { id }
  });
  return data.deleteInquiry;
};

// Newsletter API
export const subscribeNewsletter = async (email, name) => {
  const { data } = await client.mutate({
    mutation: queries.SUBSCRIBE_NEWSLETTER,
    variables: { email, name }
  });
  return data.subscribeNewsletter;
};

export const getNewsletterSubscribers = async () => {
  const { data } = await client.query({ query: queries.GET_NEWSLETTER_SUBSCRIBERS });
  return { status: 'success', data: data.newsletterSubscribers };
};

// Bookings API
export const createBooking = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_BOOKING,
    variables: { input }
  });
  return data.createBooking;
};

export const getBookings = async (status) => {
  const { data } = await client.query({
    query: queries.GET_BOOKINGS,
    variables: { status }
  });
  return { status: 'success', data: data.bookings };
};

export const getBooking = async (id) => {
  const { data } = await client.query({
    query: queries.GET_BOOKING,
    variables: { id }
  });
  return { status: 'success', data: data.booking };
};

export const updateBooking = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_BOOKING,
    variables: { id, input }
  });
  return data.updateBooking;
};

export const deleteBooking = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_BOOKING,
    variables: { id }
  });
  return data.deleteBooking;
};

// Auth API
export const checkSetup = async () => {
  const { data } = await client.query({ query: queries.CHECK_SETUP });
  return data.checkSetup;
};

export const setupAdmin = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.SETUP_ADMIN,
    variables: { input }
  });
  return data.setupAdmin;
};

export const login = async (username, password) => {
  const { data } = await client.mutate({
    mutation: queries.LOGIN,
    variables: { username, password }
  });
  return data.login;
};

export const logout = async () => {
  const { data } = await client.mutate({ mutation: queries.LOGOUT });
  return data.logout;
};

export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  const { data } = await client.mutate({
    mutation: queries.CHANGE_PASSWORD,
    variables: { currentPassword, newPassword, confirmPassword }
  });
  return data.changePassword;
};

export const getProfile = async () => {
  const { data } = await client.query({ query: queries.GET_PROFILE });
  return { status: 'success', data: data.profile };
};

// Offers API
export const getOffers = async (status = 'active') => {
  const { data } = await client.query({
    query: queries.GET_OFFERS,
    variables: { status }
  });
  return { status: 'success', data: data.offers };
};

export const getOffer = async (id) => {
  const { data } = await client.query({
    query: queries.GET_OFFER,
    variables: { id }
  });
  return { status: 'success', data: data.offer };
};

export const createOffer = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_OFFER,
    variables: { input }
  });
  return data.createOffer;
};

export const updateOffer = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_OFFER,
    variables: { id, input }
  });
  return data.updateOffer;
};

export const deleteOffer = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_OFFER,
    variables: { id }
  });
  return data.deleteOffer;
};

// Partners API
export const getPartners = async (status = 'active') => {
  const { data } = await client.query({
    query: queries.GET_PARTNERS,
    variables: { status }
  });
  return { status: 'success', data: data.partners };
};

export const getPartner = async (id) => {
  const { data } = await client.query({
    query: queries.GET_PARTNER,
    variables: { id }
  });
  return { status: 'success', data: data.partner };
};

export const createPartner = async (input) => {
  const { data } = await client.mutate({
    mutation: queries.CREATE_PARTNER,
    variables: { input }
  });
  return data.createPartner;
};

export const updatePartner = async (id, input) => {
  const { data } = await client.mutate({
    mutation: queries.UPDATE_PARTNER,
    variables: { id, input }
  });
  return data.updatePartner;
};

export const deletePartner = async (id) => {
  const { data } = await client.mutate({
    mutation: queries.DELETE_PARTNER,
    variables: { id }
  });
  return data.deletePartner;
};

export default client;
