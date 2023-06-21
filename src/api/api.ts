import axios from "axios";



export const baseURL = 'https://projects-management-backend.vercel.app';
// export const baseURL = 'http://localhost:8082';

const projectsManagement = axios.create({ baseURL });


export default projectsManagement;