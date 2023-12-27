import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { showDelegation, updateDelegation } from '../../../services/delegationService';
import { AuthContext } from '../../../helpers/AuthContext';

export const EditDelegationScreen = () => {

  const tags_name = 'delegaciones';
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [delegation, setDelegation] = useState({});
  const { dispatch } = useContext(AuthContext);


  const getDelegation = async () => {
    setLoading(true);
    await showDelegation(params.id).then(response => {
        setDelegation(response.data.data);
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
    const fileInput = document.querySelector('#logo');
    let logo = null;
    if (fileInput.files.length > 0) {
      logo = fileInput.files[0];
      formData.append('logo', logo);
    } 
    formData.append('name', data.name);
    formData.append('description', data.description);
    await updateDelegation(params.id, formData).then(response => {
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

  useEffect(() => {
    getDelegation();
  }, []);

  useEffect(() => {
    setValue('name', delegation.name);
    setValue('description', delegation.description);
  }, [delegation]);

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Editar Delegaci&oacute;n</h2>
        </div>
        <div className="card-body">
            <form className='row' onSubmit={ handleSubmit(handleEdit) }>
            <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className={ 'form-control' + (errors.title ? ' is-invalid': '') } id="title" name='name' { ...register('name', { required: true }) } placeholder="Nombre" />
                {errors.title && errors.title.type === "required" && (
                    <span className='invalid-feedback'>El nombre es requerido</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input type="file" className={ 'form-control' + (errors.pdf ? ' is-invalid': '') } id="logo" name='logo' { ...register('logo') } placeholder="Logo" />
                {errors.pdf && errors.pdf.type === "required" && (
                    <span className='invalid-feedback'>El logo es requerido</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">Descripci&oacute;n</label>
                <textarea type="text" className={ 'form-control' + (errors.description ? ' is-invalid': '') } id="description" name='description' { ...register('description', { required: true }) } placeholder="Descripci&oacute;n" />
                {errors.description && errors.description.type === "required" && (
                    <span className='invalid-feedback'>La descripci&oacute;n es requerida</span>
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
