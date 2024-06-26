import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext';
import { ClipLoader } from 'react-spinners';
import { app } from '../../../config/app';
import { types } from '../../../helpers/types';
import { toast } from 'react-toastify';
import { logout } from '../../../services/authService';

export const Header = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = async () => {
        setLoading(true);
        await logout().then(response => {
            dispatch({
                type: types.logout
            });
            toast.success('Ha cerrado sesión correctamente');
            navigate(app.url_login);
        }).catch(error => {
            if(error.response?.status == 401) {
                dispatch({
                    type: types.logout
                });
                toast.success('Ha cerrado sesión correctamente');
                navigate(app.url_login);
            } else {
                toast.error(error.response?.data?.message);
            }
        });
        setLoading(false);
    }

    return (
        <header className='shadow-sm border-bottom'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/admin">
                        <img src={ '.'+app.public_url+'/assets/logoACRP.png' } alt="LogoACRP" width="70" height="24" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Inicio</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <p className='mt-2 mx-3'>Sea Bienvenido/a { user.name } </p>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Perfil
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><span className="dropdown-item" href="#" style={{cursor: 'pointer'}}><Link to='/admin/perfil' style={{textDecoration: 'none', color: 'black'}}>Mi Perfil</Link></span></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><span className="dropdown-item" onClick={ handleLogout } style={{cursor: 'pointer'}}><ClipLoader
                                                color="fff"
                                                loading={loading}
                                                size={20}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />Cerrar Sesión</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
