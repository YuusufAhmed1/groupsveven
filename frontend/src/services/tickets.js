import api from './api.js'

export const getMyTickets = () => api.get('/tickets/my-tickets').then((response) => response.data)
export const getTicket = (id) => api.get(`/tickets/${id}`).then((response) => response.data)
export const verifyTicket = (qrToken) => api.post('/tickets/verify', { qrToken }).then((response) => response.data)
export const getOrganizerStats = () => api.get('/organizer/stats').then((response) => response.data)
export const getAdminUsers = () => api.get('/admin/users').then((response) => response.data)
export const getAdminEvents = () => api.get('/admin/events').then((response) => response.data)
export const getAdminTickets = () => api.get('/admin/tickets').then((response) => response.data)
export const getAdminStats = () => api.get('/admin/stats').then((response) => response.data)
