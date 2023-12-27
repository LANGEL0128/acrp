import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImgDefault from '../../../assets/default.jpg'
import { showPublication } from '../../../services/publicationService';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../helpers/AuthContext';

export const ShowPublicationScreen = () => {
    
    const params = useParams();
    const navigate = useNavigate();
    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const getPublication = async () => {
        setLoading(true);
        await showPublication(params.id).then(response => {
            setPublication(response.data.data);
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
        getPublication();
    }, []);

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Ver Publicación</h2>
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
                            <img src={ publication.photo ? publication.photo : ImgDefault } alt="" className='img-thumbnail'/>
                        </div>
                        <div className="col-md-6">
                            <p><em>T&iacute;tulo: </em> { publication.title }</p>
                            <p><em>Categor&iacute;a: </em> { publication.category }</p>
                            <p><em>Autor: </em> { publication.user?.name }</p>
                            <p><em>PDF: </em> <a target='_blank' href={ publication.pdf } ><button className='btn btn-success'>Ver PDF</button></a></p>
                            <p><em>Descripción: </em> { publication.description }</p>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <Link to="/admin/publicaciones" className='btn btn-secondary' >Atrás</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
