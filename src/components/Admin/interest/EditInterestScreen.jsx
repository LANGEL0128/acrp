import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { app } from '../../../config/app';
import { types } from '../../../helpers/types';
import { showInterest, updateInterest } from '../../../services/interestService';
import { AuthContext } from '../../../helpers/AuthContext';

export const EditInterestScreen = () => {

  const tags_name = 'intereses';
  const params = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState({});
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const getInterest = async () => {
    setLoading(true);
    await showInterest(params.id).then(response => {
      setInterest(response.data.data);
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

  const handleEdit = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('name', data.name);
    await updateInterest(params.id, formData).then(response => {
      toast.success(response.data?.message);
      navigate(-1);
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

  useEffect(() => {
    getInterest();
  }, []);

  useEffect(() => {
    setValue('name', interest.name);
  }, [interest]);

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Editar Interés</h2>
        </div>
        <div className="card-body">
            <form className='row' onSubmit={ handleSubmit(handleEdit) }>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className={ 'form-control' + (errors.name ? ' is-invalid': '') } id="name" name='name' { ...register('name', { required: true }) } placeholder="Nombre" />
                {errors.name && errors.name.type === "required" && (
                    <span className='invalid-feedback'>El nombre es requerido</span>
                )}
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-warning mx-2">
                  <ClipLoader
                      color="fff"
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
                  Editar
                </button>
                <Link to={"/admin/"+tags_name} className='btn btn-secondary' >Cancelar</Link>
              </div>
            </form>
        </div>
    </div>
  )
}
