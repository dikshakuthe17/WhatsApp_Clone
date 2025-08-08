import axios from 'axios';

const API_URL = 'https://whatsapp-backend-six.vercel.app/api';
export default API_URL;
export const getConversations = () => axios.get(`${API_URL}/conversations`);
export const getMessages = (wa_id) => axios.get(`${API_URL}/messages/${wa_id}`);
export const sendMessage = (data) => axios.post(`${API_URL}/send-message`, data);
