import axios from 'axios';

const API_URL = 'https://surya1902.pythonanywhere.com/api/logs/';

export const createLog = async (logData) => {
    return await axios.post(API_URL, logData);
};

export const getLogs = async () => {
    return await axios.get(API_URL);
};
