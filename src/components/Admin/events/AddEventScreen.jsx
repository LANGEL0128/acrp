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

export const AddEventScreen = () => {

  const tags_name = 'eventos';
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [delegations, setDelegations] = useState([]);

  const getDelegations = async () => {
    setLoading(true);
    await listDelegationSimple().then(response => {
      setDelegations(response.data.data);
    }).catch(error => {
      console.log(error);
      toast.error(error.response?.message);
    });
    setLoading(false);
  }

  const handleAdd = async (data) => {
    setLoading(true);
    let formData = new FormData();
    const fileInput = document.querySelector('#photo');
    let photo = null;
    if (fileInput.files.length > 0) {
      photo = fileInput.files[0];
      formData.append('photo', photo);
    }
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('address', data.address);
    formData.append('datetime', data.date + ' ' + data.time);
    formData.append('delegation', data.delegation);
    await createEvent(formData).then(response => {
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
    getDelegations();
  }, []);

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Agregar Evento</h2>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(handleAdd)} className='row'>
              <div className="col-md-6 mb-3">
                <label htmlFor="delegation" className="form-label">Delegaci&oacute;n</label>
                <select className={ 'form-select' + (errors.delegation ? ' is-invalid': '') } id="delegation" name='delegation' { ...register('delegation', { required: true }) } placeholder="Delegaci&oacute;n" >
                  <option value=""> -- Seleccionar -- </option>
                  {
                    delegations.map(delegation => {
                      return (<option key={ delegation.uuid } value={ delegation.uuid } >{ delegation.name }</option>);
                    })
                  }
                </select>
                {errors.delegation && errors.delegation.type === "required" && (
                    <span className='invalid-feedback'>La delegaci&oacute;n es requerida</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className={ 'form-control' + (errors.name ? ' is-invalid': '') } id="name" name='name' { ...register('name', { required: true }) } placeholder="Nombre" />
                {errors.name && errors.name.type === "required" && (
                    <span className='invalid-feedback'>El nombre es requerido</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="category" className="form-label">Categor&iacute;a</label>
                <input type="text" className={ 'form-control' + (errors.category ? ' is-invalid': '') } id="category" name='category' { ...register('category', { required: true }) } placeholder="Categor&iacute;a" />
                {errors.category && errors.category.type === "required" && (
                    <span className='invalid-feedback'>La categoría es requerida</span>
                )} 
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photo" className="form-label">Imagen</label>
                <input type="file" className={ 'form-control' + (errors.photo ? ' is-invalid': '') } id="photo" name='photo' { ...register('photo', { required: true }) } placeholder="Imagen" />
                {errors.photo && errors.photo.type === "required" && (
                    <span className='invalid-feedback'>La imagen es requerida</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="date" className="form-label">Fecha</label>
                <input type="date" className={ 'form-control' + (errors.date ? ' is-invalid': '') } id="date" name='date' { ...register('date', { required: true }) } placeholder="Fecha" />
                {errors.date && errors.date.type === "required" && (
                    <span className='invalid-feedback'>La fecha es requerida</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="time" className="form-label">Hora</label>
                <input type="time" className={ 'form-control' + (errors.time ? ' is-invalid': '') } id="time" name='time' { ...register('time', { required: true }) } placeholder="Hora" />
                {errors.time && errors.time.type === "required" && (
                    <span className='invalid-feedback'>La hora es requerida</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">Direcci&oacute;n</label>
                <textarea type="text" className={ 'form-control' + (errors.address ? ' is-invalid': '') } id="address" name='address' { ...register('address', { required: true }) } placeholder="Direcci&oacute;n" />
                {errors.address && errors.address.type === "required" && (
                    <span className='invalid-feedback'>La direcci&oacute;n es requerida</span>
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
