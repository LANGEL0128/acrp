import axios from 'axios';
import { app } from '../config/app';

export const login = (data) => axios.post(app.api_domain + 'auth/login', data);

export const logout = () => axios.get(app.api_domain + 'auth/logout');

export const refresh = () => axios.get(app.api_domain + 'auth/refresh');

export const me = () => axios.get(app.api_domain + 'auth/me');