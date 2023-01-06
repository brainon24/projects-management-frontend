import axios from "axios";



export const baseURL = 'https://projects-management-backend-production.up.railway.app';
// export const baseURL = 'http://localhost:8080';

const projectsManagement = axios.create({ baseURL });


export default projectsManagement;