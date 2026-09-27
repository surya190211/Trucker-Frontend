import axios from 'axios';

const API_URL = 'http://localhost:8000/api/logs/';

export const createLog = async (logData) => {
    return await axios.post(API_URL, logData);
};

export const getLogs = async () => {
    return await axios.get(API_URL);
};
