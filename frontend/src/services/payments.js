import api from './api.js'

export const processDemoPayment = (data) => api.post('/payments/demo', data).then((response) => response.data)
