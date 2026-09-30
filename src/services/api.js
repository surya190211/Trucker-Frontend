import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.startsWith('http')) ? import.meta.env.VITE_API_BASE_URL : 'https://surya1902.pythonanywhere.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDailyLogs = () => api.get('/logs/');
export const createDailyLog = (logData) => api.post('/logs/', logData);

export default api;

export const getDrivers = () => api.get('/drivers/');
export const createDriver = (data) => api.post('/drivers/', data);

export const getTrucks = () => api.get('/trucks/');
export const createTruck = (data) => api.post('/trucks/', data);

export const planTrip = (data) => api.post('/trips/plan/', data);
export const getHOS = () => api.get('/hos/');

