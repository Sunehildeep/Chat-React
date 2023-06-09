// actions for conversations
import axios from 'axios';

export const getConversationsList = async (id) => {
    try {
        const response = await axios.get('http://localhost:5000/api/conversations/' + id);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch conversation list');
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/getAllUsers');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const getConversationHistory = async (id) => {
    try {
        const response = await axios.get('http://localhost:5000/api/getConversationHistory/' + id);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch history');
    }
};

export const postMessage = async (id, sender, message) => {
    try {
        const response = await axios.post('http://localhost:5000/api/postMessage', { id, sender, message });
        return response.data;
    } catch (error) {
        throw new Error('Failed to post conversation');
    }
}

export const startConvo = async (user1, user2, message) => {
    try {
        const response = await axios.post('http://localhost:5000/api/startConvo', { user1, user2, message });
        return response.data;
    } catch (error) {
        throw new Error('Failed to start conversation');
    }
}