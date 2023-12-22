import axios from "axios";
import { app } from "../config/app";

const entity = 'projects';

// queryParams debe ser un objeto
export const listProject = (queryParams) => axios.get(app.api_domain+entity+'?'+new URLSearchParams(queryParams));

export const createProject = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showProject = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updateProject = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deleteProject = (id) => axios.delete(app.api_domain+entity+'/'+id); 