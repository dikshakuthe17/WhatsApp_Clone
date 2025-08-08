import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getConversations = () => axios.get(`${API_URL}/conversations`);
export const getMessages = (wa_id) => axios.get(`${API_URL}/messages/${wa_id}`);
export const sendMessage = (data) => axios.post(`${API_URL}/send-message`, data);
