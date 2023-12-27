import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImgDefault from './../../../assets/default.jpg';
import { app } from '../../../config/app';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../helpers/AuthContext';
import { types } from '../../../helpers/types';
import { deleteInterest, listInterestSimple } from '../../../services/interestService';

export const ListInterestScreen = () => {

    const tags_name = 'intereses';
    const [interests, setInterests] = useState([]);
    const [loading, setloading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const getInterests = async (queryParams = {}) => {
        setloading(true);
        await listInterestSimple(queryParams).then(response => {
            setInterests(response.data.data);
            console.log(response.data.data)
        }).catch(error => {
            if(error.response?.status == 401) {
                navigate(app.url_login);
            } else {
                toast.error(error.response?.data?.message);
            }
            console.log(error);
        });
        setloading(false);
    }

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro que deseas eliminar este interés?")) {
            setloading(true);
            await deleteInterest(id).then(response => {
                setInterests(interests.filter(interests => interests.uuid != id));
                toast.success(response.data?.message);
            }).catch(error => {
                if(error.response?.status == 401) {
                    dispatch({
                        type: types.logout
                    })
                    toast.error('Ha expirado la sesión');
                    navigate(app.url_login);
                } else {
                    toast.error(error.response?.data?.message);
                }
                console.log(error);
            });
            setloading(false);
        }
    }

    useEffect(() => {
        getInterests();
    }, []);
    

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Listado de Intereses</h2>
            </div>
            <div className="card-body">
                <Link to={"/admin/"+tags_name+"/add"} className='btn btn-primary btn-sm'>Agregar</Link>
                <hr />
                {   loading ? <div className="d-flex justify-content-center">
                    <ClipLoader
                        color="fff"
                        loading={loading}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                    </div> :
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        interests.map((interest, i) => {
                                            return (
                                                <tr key={ interest.uuid }>
                                                    <th scope="row">{ i+1 }</th>
                                                    <td>{ interest.name }</td>
                                                    <td>
                                                        <Link className='btn btn-warning btn-sm' to={ '/admin/'+tags_name+'/edit/'+interest.uuid }>Editar</Link>
                                                        <button className='btn btn-danger btn-sm' onClick={ () => handleDelete(interest.uuid) }>Eliminar</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
