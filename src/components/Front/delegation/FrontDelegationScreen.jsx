import React, { useEffect, useState } from 'react'
import { listDelegationSimple } from '../../../services/delegationService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export const FrontDelegationScreen = () => {

  const [delegations, setDelegations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDelegations = async () => {
    setLoading(true);
    await listDelegationSimple().then(response => {
      setDelegations(response.data.data);
    }).catch(error => {
      console.log(error);
      toast.error(error.response.data?.message);
    })
    setLoading(false);
  }

  useEffect(() => {
    getDelegations();
  }, []);

  return (
    <section className='container my-5'>
      <div className="col-12 animate__animated animate__fadeInLeft">
          <h3>Delegaciones</h3>
      </div>
      <div className="col-12">
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
          <div className="row">
              {
                delegations.map((delegation) => {
                  return (
                    <div key={ delegation.uuid } className={ "card col-md-3 shadow animate__animated animate__fadeInLeft mx-2" }>
                        <img src={ delegation.logo } className="card-img-top" alt="Imagen" />
                        <div className="card-body">
                            <h5 className="card-title">{ delegation.name }</h5>
                            <p className="card-text">{ delegation.description }</p>
                            <Link to={ '/delegaciones/show/'+delegation.uuid } className="btn btn-primary">Ver Más </Link>
                        </div>
                    </div>
                  )
                })
              }
          </div>
        }
      </div>
    </section>
  )
}
