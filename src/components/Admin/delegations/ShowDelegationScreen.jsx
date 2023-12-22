import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImgDefault from '../../../assets/default.jpg'
import { ClipLoader } from 'react-spinners';
import { showDelegation } from '../../../services/delegationService';

export const ShowDelegationScreen = () => {
    
    const params = useParams();
    const [delegation, setDelegation] = useState({});
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        getDelegation();
    }, []);

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Ver Delegaci&oacute;n</h2>
            </div>
            <div className="card-body">
                { 
                    loading ? <div className="row d-flex justify-content-center">
                        <ClipLoader
                            color="fff"
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                    </div>
                    :
                    <div className="row">
                        <div className="col-6">
                            <img src={ delegation.logo ? delegation.logo : ImgDefault } alt="" className='img-thumbnail'/>
                        </div>
                        <div className="col-6">
                            <p><em>Nombre: </em> { delegation.name }</p>
                            <p><em>Descripci&oacute;n: </em> { delegation.description }</p>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <Link to="/admin/delegaciones" className='btn btn-secondary' >Atrás</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
