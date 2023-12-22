import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { app } from '../../../config/app';
import { AuthContext } from '../../../helpers/AuthContext';
import { types } from '../../../helpers/types';
import { createProject } from '../../../services/projectService';

export const AddProjectScreen = () => {

  const tags_name = 'proyectos';
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleAdd = async (data) => {
    setLoading(true);
    let formData = new FormData();
    const fileInput = document.querySelector('#photo');
    let photo = null;
    if (fileInput.files.length > 0) {
      photo = fileInput.files[0];
    }
    const pdf = document.querySelector('#pdf').files[0];
    if(photo) {
      formData.append('photo', photo);
    }
    formData.append('pdf', pdf);
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('description', data.description);
    await createProject(formData).then(response => {
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
            <h2>Agregar Proyecto</h2>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(handleAdd)} className='row'>
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">T&iacute;tulo</label>
                <input type="text" className={ 'form-control' + (errors.title ? ' is-invalid': '') } id="title" name='title' { ...register('title', { required: true }) } placeholder="T&iacute;tulo" />
                {errors.title && errors.title.type === "required" && (
                    <span className='invalid-feedback'>El t&iacute;tulo es requerido</span>
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
                <input type="file" className="form-control" id="photo" name='photo' />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="pdf" className="form-label">PDF</label>
                <input type="file" className={ 'form-control' + (errors.pdf ? ' is-invalid': '') } id="pdf" name='pdf' { ...register('pdf', { required: true }) } placeholder="PDF" />
                {errors.pdf && errors.pdf.type === "required" && (
                    <span className='invalid-feedback'>El pdf es requerido</span>
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
