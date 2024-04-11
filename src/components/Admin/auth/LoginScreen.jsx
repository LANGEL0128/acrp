import { app } from '../../../config/app'
import './login.css'

import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../helpers/AuthContext';
import { types } from '../../../helpers/types';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/authService';


export const LoginScreen = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        setLoading(true);
        await login(data).then(response => {
            const { user, access_token, refresh_token } = response.data.data;
            dispatch({
                type: types.login,
                payload: {
                    ...user,
                    access_token,
                    refresh_token
                }
            });
            toast.success('Ha iniciado sesión correctamente');
            navigate('/admin', {
                replace: true
            });
        }).catch(error => {
            if(error.response?.status == 401) {
                toast.error(error.response.data?.message);
            } else {
                toast.error(error.response?.data?.message);
            }
        });
        setLoading(false);
    }

    return (
        <div className="d-flex justify-content-center align-items-center box-content">
            <div className="card col-md-4 animate__animated animate__fadeIn shadow-sm">
                <div className="card-header">
                    <h2>Inicie Sesión en { app.name }</h2>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img src={ '/assets/logoACRP.png' } alt="LogoACRP" width="70" height="24" />
                    </div>
                    <form onSubmit={ handleSubmit(handleLogin) }>
                        <div className="mb-3">
                            <label htmlFor="username">Usuario</label>
                            <input type="text" name='username' id='username' {...register('username', {required: true})} className={ 'form-control' + (errors.username ? ' is-invalid': '') } placeholder='Usuario'/>
                            {errors.username && errors.username.type === "required" && (
                                <span className='invalid-feedback'>El usuario es requerido</span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Contrase&ntilde;a</label>
                            <input type="password" name='password' id='password' {...register('password', {required: true})} className={ 'form-control' + (errors.password ? ' is-invalid': '') } placeholder='Contrase&ntilde;a'/>
                            {errors.password && errors.password.type === "required" && (
                                <span className='invalid-feedback'>La contrase&ntilde;a es requerida</span>
                            )}
                        </div>
                        <div className="mb-3 d-flex justify-content-center">
                            <button type='submit' onClick={ handleLogin } className='btn btn-primary'>
                            <ClipLoader
                                color="fff"
                                loading={loading}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <Link to="/">Ir al sitio principal</Link>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <Link to="/inscribirse">Inscríbete como Miembro</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
