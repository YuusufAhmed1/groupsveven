import api from './api.js'

export const createBooking = (data) => api.post('/bookings', data).then((response) => response.data)
export const getMyBookings = () => api.get('/bookings/my-bookings').then((response) => response.data)
export const getEventBookings = (eventId) => api.get(`/bookings/event/${eventId}`).then((response) => response.data)
