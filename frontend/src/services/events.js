import api from './api.js'

export const getEvents = () => api.get('/events').then((response) => response.data)
export const getEvent = (id) => api.get(`/events/${id}`).then((response) => response.data)
export const getMyEvents = () => api.get('/events/my-events').then((response) => response.data)
export const createEvent = (data) => api.post('/events', data).then((response) => response.data)
export const updateEvent = (id, data) => api.put(`/events/${id}`, data).then((response) => response.data)
export const deleteEvent = (id) => api.delete(`/events/${id}`).then((response) => response.data)
export const publishEvent = (id) => api.patch(`/events/${id}/publish`).then((response) => response.data)
export const getTicketTypes = (eventId) => api.get(`/tickets/types/${eventId}`).then((response) => response.data)
export const createTicketType = (data) => api.post('/tickets/types', data).then((response) => response.data)
export const updateTicketType = (id, data) => api.put(`/tickets/types/${id}`, data).then((response) => response.data)
export const deleteTicketType = (id) => api.delete(`/tickets/types/${id}`).then((response) => response.data)
