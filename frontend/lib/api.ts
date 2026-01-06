import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const queryDocument = async (question: string) => {
    const response = await axios.post(`${API_BASE_URL}/query`, { question });
    return response.data;
};
