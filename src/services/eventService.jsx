import axios from "axios";
import { app } from "../config/app";

const entity = 'events';

// queryParams debe ser un objeto
export const listEvent = (queryParams) => axios.get(app.api_domain+entity+'?'+new URLSearchParams(queryParams));

export const createEvent = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showEvent = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updateEvent = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deleteEvent = (id) => axios.delete(app.api_domain+entity+'/'+id); 