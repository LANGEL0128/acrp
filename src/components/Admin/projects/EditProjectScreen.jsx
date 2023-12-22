import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { showPublication, updatePublication } from '../../../services/publicationService';
import { toast } from 'react-toastify';
import { showProject, updateProject } from '../../../services/projectService';
import { app } from '../../../config/app';

export const EditProjectScreen = () => {

  const tags_name = 'proyectos';
  const params = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [isCheckedDeletePhoto, setIsCheckedDeletePhoto] = useState(false);
  const [project, setProject] = useState({});

  const handleChangeDeletePhoto = () => {
    setIsCheckedDeletePhoto(!isCheckedDeletePhoto);
  }

  const getProject = async () => {
    setLoading(true);
    await showProject(params.id).then(response => {
      setProject(response.data.data);
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
    const fileInput = document.querySelector('#photo');
    const pdfInput = document.querySelector('#pdf');
    let photo = null;
    if (pdfInput.files.length > 0) {
      const pdf = document.querySelector('#pdf').files[0];
      formData.append('pdf', pdf);
    }
    if (fileInput.files.length > 0) {
      photo = fileInput.files[0];
      formData.append('photo', photo);
    } else if(isCheckedDeletePhoto) {
      formData.append('photo', null);
    }
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('description', data.description);
    await updateProject(params.id, formData).then(response => {
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
    getProject();
  }, []);

  useEffect(() => {
    setValue('title', project.title);
    setValue('category', project.category);
    setValue('description', project.description);
  }, [project]);

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Editar Proyecto</h2>
        </div>
        <div className="card-body">
            <form className='row' onSubmit={ handleSubmit(handleEdit) }>
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
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" onChange={ handleChangeDeletePhoto } role="switch" id="delete-photo"/>
                  <label className="form-check-label" htmlFor="delete-photo">Eliminar Actual</label>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="pdf" className="form-label">PDF</label>
                <input type="file" className='form-control' id="pdf" name='pdf' placeholder="PDF" />
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
