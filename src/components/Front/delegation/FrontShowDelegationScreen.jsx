import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { showDelegation } from '../../../services/delegationService';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import ImgDefault from './../../../assets/default.jpg';

export const FrontShowDelegationScreen = () => {

  const params = useParams();
  const [delegation, setDelegation] = useState({});
  const [members, setMembers] = useState([]);
  const [eventxs, setEventxs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDelegation = async () => {
    setLoading(true);
    await showDelegation(params.id).then(response => {
      setDelegation(response.data.data);
      setMembers(response.data.data.members);
      setEventxs(response.data.data.eventxes);
    }).catch(error => {
      console.log(error)
      toast.error(error.response.data?.message);
    })
    setLoading(false);
  }

  useEffect(() => {
    getDelegation();
  }, []);

  return (
    <>
      <section className='container my-5'>
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
            <div id="carouselExampleSlidesOnly" className="carousel slide animate__animated animate__fadeIn" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={ delegation.logo } className="d-block w-100 rounded" alt="..."/>
                </div>
              </div>
            </div>
            <div className="card my-5 shadow animate__animated animate__fadeInRight">
              <h2 className="card-header">Datos de la Delegación</h2>
              <div className="card-body">
                <h5 className="card-title"><strong>Nombre: </strong> { delegation.name }</h5>
                <p className="card-text"><strong>Descripción: </strong> { delegation.description } </p>
              </div>
            </div>
            <h3>Miembros</h3>
            <div className="row">
              {
                members.map((member, index) => {
                  return (
                    <div key={ member.uuid } className={ "card col-md-3 m-2 shadow animate__animated" + (index%2==0 ? ' animate__fadeInRight': ' animate__fadeInLeft') }>
                        <img src={ member.user.photo } className="card-img-top" alt="Imagen" />
                        <div className="card-body">
                            <h5 className="card-title">{ member.user.name + ' ' + member.user.surname }</h5>
                            <p className="card-text">{ member.email_personal }</p>
                            <p className="card-text"><strong>Responsabilidad</strong> { member.responsibility }</p>
                            <Link to={ '/miembros/show/'+member.uuid } className="btn btn-primary">Ver Más </Link>
                        </div>
                    </div>
                  )
                })
              }
            </div>
            <h3>Eventos</h3>
            <div className="row">
              {
                eventxs.map((eventx, index) => {
                  return (
                    <div key={ eventx.uuid } className="card mb-3 animate__animated animate__fadeIn shadow">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img src={ eventx.photo } className="img-fluid shadow rounded-start" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title"> { eventx.name } </h5>
                            <p className="card-text"> <strong>Categoría: </strong> { eventx.category } </p>
                            <p className="card-text"><strong>Dirección: </strong> { eventx.address }</p>
                            <p className="card-text"><strong>Descripción: </strong> { eventx.description }</p>
                            <p className="card-text"><small className="text-muted"> { eventx.datetime } </small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
      </section>
    </>
  )
}
