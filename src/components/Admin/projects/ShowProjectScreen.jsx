import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImgDefault from '../../../assets/default.jpg'
import { showPublication } from '../../../services/publicationService';
import { ClipLoader } from 'react-spinners';
import { showProject } from '../../../services/projectService';

export const ShowProjectScreen = () => {
    
    const tags_name = 'proyectos';
    const params = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Ver Proyecto</h2>
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
                            <img src={ project.photo !== 'null' ? project.photo : ImgDefault } alt="" className='img-thumbnail'/>
                        </div>
                        <div className="col-md-6">
                            <p><em>T&iacute;tulo: </em> { project.title }</p>
                            <p><em>Categor&iacute;a: </em> { project.category }</p>
                            <p><em>Autor: </em> { project.user?.name }</p>
                            <p><em>PDF: </em> <a target='_blank' href={ project.pdf } ><button className='btn btn-success'>Ver PDF</button></a></p>
                            <p><em>Descripción: </em> { project.description }</p>
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
