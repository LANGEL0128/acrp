import React, { useEffect, useState } from 'react'
import { listEvent } from '../../../services/eventService';
import { ClipLoader } from 'react-spinners';
import { Pagination } from '../../Admin/tpl/Pagination';

export const FrontEventScreen = () => {
  const [eventxs, setEventxs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState({});

  const getEventxs = async (queryParams = {}) => {
    setLoading(true);
    await listEvent(queryParams).then(response => {
      setEventxs(response.data.data.items)
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
        getEventxs(params);
    }
  }

  useEffect(() => {
    getEventxs();
  }, []);

  return (
    <section className='container my-5'>
      <div className="col-12 animate__animated animate__fadeInLeft">
        <h3>Eventos</h3>
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
                eventxs.map(eventx => {
                  return (<div key={ eventx.uuid } className="card mb-3 animate__animated animate__fadeIn shadow">
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img src={ eventx.photo } className="img-fluid shadow rounded-start" />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title"> { eventx.name } </h5>
                                  <p className="card-text"> <strong>Delegación: </strong> { eventx.delegation.name } </p>
                                  <p className="card-text"> <strong>Categoría: </strong> { eventx.category } </p>
                                  <p className="card-text"><strong>Dirección: </strong> { eventx.address }</p>
                                  <p className="card-text"><strong>Descripción: </strong> { eventx.description }</p>
                                  <p className="card-text"><small className="text-muted"> { eventx.datetime } </small></p>
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
