import axios from 'axios';
import { API_URL } from '../constants/api';

const menuService = {
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    create: async (menuData) => {
        const response = await axios.post(API_URL, menuData);
        return response.data;
    },

    update: async (id, menuData) => {
        const response = await axios.put(`${API_URL}/${id}`, menuData);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
}

export default menuService;