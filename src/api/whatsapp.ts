import axios from "axios";

export const whatsappApi = import.meta.env.VITE_WHATSAPP_API_URL;

const whatsapp = axios.create({ baseURL: whatsappApi });

export default whatsapp;