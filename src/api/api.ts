import axios from "axios";



export const baseURL = 'https://gestor-proyectos-4e8c263c4a4a.herokuapp.com';
// export const baseURL = 'http://localhost:8082';

const projectsManagement = axios.create({ baseURL });


export default projectsManagement;