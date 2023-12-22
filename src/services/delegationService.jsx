import axios from "axios";
import { app } from "../config/app";

const entity = 'delegations';

// queryParams debe ser un objeto
export const listDelegation = (queryParams) => axios.get(app.api_domain+entity+'?'+new URLSearchParams(queryParams));

export const listDelegationSimple = () => axios.get(app.api_domain+entity+'/simple');

export const createDelegation = (formData) => axios.post(app.api_domain+entity, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const showDelegation = (id) => axios.get(app.api_domain+entity+'/'+id); 

export const updateDelegation = (id, formData) => axios.post(app.api_domain+entity+'/update/'+id, formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const deleteDelegation = (id) => axios.delete(app.api_domain+entity+'/'+id); 