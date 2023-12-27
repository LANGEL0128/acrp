import axios from "axios";
import { app } from "../config/app";

const entity = 'interests';

export const listInterestSimple = () => axios.get(app.api_domain+entity+'/simple');

export const createInterest = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showInterest = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updateInterest = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deleteInterest = (id) => axios.delete(app.api_domain+entity+'/'+id); 