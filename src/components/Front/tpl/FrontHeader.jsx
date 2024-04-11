import React from 'react'
import { Link } from 'react-router-dom'
import { app } from '../../../config/app'

export const FrontHeader = () => {
    return (
        <header className='shadow-sm border-bottom'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={ app.public_url+'/assets/logoACRP.png' } alt="LogoACRP" width="70" height="24" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/delegaciones">Delegaciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/publicaciones">Publicaciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/proyectos">Proyectos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/eventos">Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/miembros">Miembros</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <Link className="nav-link" to="/admin/login">Iniciar Sesión</Link>
                            <Link className="nav-link" to="/inscribirse">Inscribirse</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
