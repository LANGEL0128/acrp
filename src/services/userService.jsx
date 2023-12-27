import axios from "axios";
import { app } from "../config/app";

const entity = 'users';

// queryParams debe ser un objeto
export const listUser = (queryParams) => axios.get(app.api_domain+entity+'?'+new URLSearchParams(queryParams));

export const listUserSimple = () => axios.get(app.api_domain+entity+'/simple');

export const createUser = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showUser = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updateUser = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deleteUser = (id) => axios.delete(app.api_domain+entity+'/'+id); 

export const changeUser = (id) => axios.get(app.api_domain+entity+'/change/'+id); 