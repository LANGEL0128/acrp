import React, { useEffect, useState } from 'react'
import ImgDefault from './../../../assets/default.jpg';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Pagination } from '../../Admin/tpl/Pagination';
import { listProject } from '../../../services/projectService';

export const FrontProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState({});

  const getProjects = async (queryParams = {}) => {
    setLoading(true);
    await listProject(queryParams).then(response => {
      setProjects(response.data.data.items)
      setPagination(response.data.data.pagination)
    }).catch(error => {
      console.log(error);
      toast.error(error.response.data?.message);
    });
    setLoading(false);
  }

  const handlePageFilter = (page) => {
    if(page >= 1 && page <= pagination.last_page && page != pagination.current_page) {
        const per_page = 10;
        let params = {
            per_page,
            page
        }
        getProjects(params);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <section className='container my-5'>
      <div className="col-12 animate__animated animate__fadeInLeft">
        <h3>Proyectos</h3>
      </div>
      <div className="col-12">
        <div className="row">
          {
            loading 
            ? 
            <>
              <ClipLoader
                color="fff"
                loading={loading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
                Cargando ...
            </>
            :
            <>
              { 
                projects.map(project => {
                  return (<div key={ project.uuid } className="card mb-3 animate__animated animate__fadeIn shadow">
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img src={ project.photo } className="img-fluid shadow rounded-start" />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title"> { project.title } </h5>
                                  <p className="card-text"> <strong>Autor: </strong> { project.user.name + project.user.surname } </p>
                                  <p className="card-text"> <strong>Categoría: </strong> { project.category } </p>
                                  <p className="card-text"><strong>Descripción: </strong> { project.description }</p>
                                  <p className="card-text"><strong>PDF: </strong> <a href={ project.pdf } target="_blank" download={true} className='btn btn-success'>Descargar</a></p>
                                </div>
                              </div>
                            </div>
                          </div>)
                })
              }
              <Pagination pagination={pagination} handlePageFilter={ handlePageFilter } />
            </>
          }
        </div>
      </div>
    </section>
  )
}
