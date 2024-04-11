import React, { useEffect, useState } from 'react'
import ImgDefault from './../../../assets/default.jpg';
import { listPublication } from '../../../services/publicationService';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Pagination } from '../../Admin/tpl/Pagination';

export const FrontPublicationScreen = () => {

  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState({});

  const getPublications = async (queryParams = {}) => {
    setLoading(true);
    await listPublication(queryParams).then(response => {
      setPublications(response.data.data.items)
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
        getPublications(params);
    }
  }

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <section className='container my-5'>
      <div className="col-12 animate__animated animate__fadeInLeft">
        <h3>Publicaciones</h3>
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
                publications.map(publication => {
                  return (<div key={ publication.uuid } className="card mb-3 animate__animated animate__fadeIn shadow">
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img src={ publication.photo } className="img-fluid shadow rounded-start" />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title"> { publication.title } </h5>
                                  <p className="card-text"> <strong>Autor: </strong> { publication.user.name + publication.user.surname } </p>
                                  <p className="card-text"> <strong>Categoría: </strong> { publication.category } </p>
                                  <p className="card-text"><strong>Descripción: </strong> { publication.description }</p>
                                  <p className="card-text"><strong>PDF: </strong> <a href={ publication.pdf } target="_blank" download={true} className='btn btn-success'>Descargar</a></p>
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
