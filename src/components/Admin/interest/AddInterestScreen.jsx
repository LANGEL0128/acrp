import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { app } from '../../../config/app';
import { AuthContext } from '../../../helpers/AuthContext';
import { types } from '../../../helpers/types';
import { createEvent } from '../../../services/eventService';
import { listDelegationSimple } from '../../../services/delegationService';
import { createInterest } from '../../../services/interestService';

export const AddInterestScreen = () => {

  const tags_name = 'intereses';
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleAdd = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('name', data.name);
    await createInterest(formData).then(response => {
      toast.success(response.data?.message);
      navigate('/admin/'+tags_name);
    }).catch(error => {
      if(error.response?.status == 401) {
        dispatch({
          type: types.logout
        });
        toast.error('Ha expirado la sesión');
        navigate(app.url_login);
      } else {
        toast.error(error.response?.data?.message);
      }
    });
    setLoading(false);
  }

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Agregar Interés</h2>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(handleAdd)} className='row'>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className={ 'form-control' + (errors.name ? ' is-invalid': '') } id="name" name='name' { ...register('name', { required: true }) } placeholder="Nombre" />
                {errors.name && errors.name.type === "required" && (
                    <span className='invalid-feedback'>El nombre es requerido</span>
                )}
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mx-2">
                  <ClipLoader
                      color="fff"
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
                  Agregar
                </button>
                <Link to={"/admin/"+tags_name} className='btn btn-secondary' >Cancelar</Link>
              </div>
            </form>
        </div>
    </div>
  )
}
