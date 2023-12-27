import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImgDefault from '../../../assets/default.jpg'
import { showPublication } from '../../../services/publicationService';
import { ClipLoader } from 'react-spinners';
import { showEvent } from '../../../services/eventService';
import { types } from '../../../helpers/types';
import { app } from '../../../config/app';
import { AuthContext } from '../../../helpers/AuthContext';

export const ShowEventScreen = () => {
    
    const tags_name = 'eventos';
    const navigate = useNavigate();
    const params = useParams();
    const [eventx, setEventx] = useState({});
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const getEvent = async () => {
        setLoading(true);
        await showEvent(params.id).then(response => {
            setEventx(response.data.data);
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
        getEvent();
    }, []);

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Ver Evento</h2>
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
                        <div className="col-md-6">
                            <img src={ eventx.photo ? eventx.photo : ImgDefault } alt="" className='img-thumbnail'/>
                        </div>
                        <div className="col-md-6">
                            <p><em>Nombre: </em> { eventx.name }</p>
                            <p><em>Categor&iacute;a: </em> { eventx.category }</p>
                            <p><em>Delegaci&oacute;n: </em> { eventx.delegation?.name }</p>
                            <p><em>Fecha: </em> { eventx.datetime }</p>
                            <p><em>Descripci&oacute;n: </em> { eventx.description }</p>
                            <p><em>Direcci&oacute;n: </em> { eventx.address }</p>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <Link to={"/admin/"+tags_name} className='btn btn-secondary' >Atrás</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
