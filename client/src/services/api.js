import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const generateTripStory = async (data) => {
    const response = await api.post('/generate', data);
    return response.data;
};

export const getStories = async () => {
    const response = await api.get('/generate');
    return response.data;
};

export const getStory = async (id) => {
    const response = await api.get(`/generate/${id}`);
    return response.data;
};
