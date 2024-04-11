import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImgDefault from './../../../assets/default.jpg';
import { app } from '../../../config/app';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../helpers/AuthContext';
import { types } from '../../../helpers/types';
import { Pagination } from '../tpl/Pagination';
import { changeUser, deleteUser, listUser } from '../../../services/userService';

export const ListUserScreen = () => {

    const tags_name = 'usuarios';
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [loading, setloading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChangeFilter = () => {
        const per_page = document.getElementById('per_page').value;
        const search = document.getElementById('search').value;
        let params = {
            per_page
        }
        if(search) 
            params = {
                ...params,
                search
            }
        getUsers(params);
    }

    const handlePageFilter = (page) => {
        if(page >= 1 && page <= pagination.last_page && page != pagination.current_page) {
            const per_page = document.getElementById('per_page').value;
            const search = document.getElementById('search').value;
            let params = {
                per_page,
                page
            }
            if(search) 
                params = {
                    ...params,
                    search
                }
            getUsers(params);
        }
    }

    const getUsers = async (queryParams = {}) => {
        setloading(true);
        await listUser(queryParams).then(response => {
            setUsers(response.data.data.items);
            setPagination(response.data.data.pagination);
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
        if (confirm("¿Estás seguro que deseas eliminar este usuario?")) {
            setloading(true);
            await deleteUser(id).then(response => {
                setUsers(users.filter(user => user.uuid != id));
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

    const handleChange = async (id) => {
        setloading(true);
            await changeUser(id).then(response => {
                setUsers(users.map(user => {
                    if(user.uuid == id) {
                        user.status = response.data.data.status;
                    }   
                    return user;
                }))
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

    useEffect(() => {
        getUsers();
    }, []);
    

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Listado de Usuarios</h2>
            </div>
            <div className="card-body">
                <Link to={"/admin/"+tags_name+"/add"} className='btn btn-primary btn-sm'>Agregar</Link>
                <hr />
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-2 col-12">
                            <select name="per_page" id="per_page" onChange={ handleChangeFilter } className='form-select form-select-sm'>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                        <div className="col-md-7 col-12 my-2"></div>
                        <div className="col-md-3 col-12">
                            <input type="text" name='search' id='search' onChange={ handleChangeFilter } className='form-control form-control-sm' placeholder='Buscar...'/>
                        </div>
                    </div>
                </div>
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
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, i) => {
                                            return (
                                                <tr key={ user.uuid }>
                                                    <th scope="row">{ i+1 }</th>
                                                    <td>{ user.name + ' ' + user.surname + ' ' + user.second_surname }</td>
                                                    <td><img src={ user.photo != 'null' ? user.photo : ImgDefault } width={120} height={80} alt="" /></td>
                                                    <td>{ user.username }</td>
                                                    <td>{ user.status ? 'Activo' : 'Inactivo' }</td>
                                                    <td>
                                                        <Link className='btn btn-info btn-sm' to={ '/admin/'+tags_name+'/show/'+user.uuid }>Ver</Link>
                                                        <Link className='btn btn-warning btn-sm' to={ '/admin/'+tags_name+'/edit/'+user.uuid }>Editar</Link>
                                                        <button className='btn btn-danger btn-sm' onClick={ () => handleDelete(user.uuid) }>Eliminar</button>
                                                        {
                                                            (user.role != 'Administrador') ? 
                                                            <button className='btn btn-secondary btn-sm' onClick={ () => handleChange(user.uuid) }>{ user.status ? 'Inactivar' : 'Activar' }</button>
                                                            : ''
                                                        }
                                                        
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Pagination pagination={pagination} handlePageFilter={ handlePageFilter } />
                    </>
                }
            </div>
        </div>
    )
}
