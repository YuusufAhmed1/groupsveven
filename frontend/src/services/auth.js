import api from './api.js'

export const registerUser = (data) => api.post('/auth/register', data).then((response) => response.data)
export const loginUser = (data) => api.post('/auth/login', data).then((response) => response.data)
export const getCurrentUser = () => api.get('/auth/me').then((response) => response.data)
