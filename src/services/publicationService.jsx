import axios from "axios";
import { app } from "../config/app";

const entity = 'publications';

// queryParams debe ser un objeto
export const listPublication = (queryParams) => axios.get(app.api_domain+entity+'?'+new URLSearchParams(queryParams));

export const createPublication = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showPublication = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updatePublication = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deletePublication = (id) => axios.delete(app.api_domain+entity+'/'+id); 