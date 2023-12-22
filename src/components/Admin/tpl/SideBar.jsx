import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {

  return (
    <>
        <ul className="list-group list-group-flush text-center">
            <li className="list-group-item"><Link to="/admin"> Inicio </Link></li>
            <li className="list-group-item"><Link to="/admin/delegaciones"> Delegaciones </Link></li>
            <li className="list-group-item"><Link to="/admin/eventos"> Eventos </Link></li>
            <li className="list-group-item"><Link to="/admin/publicaciones"> Publicaciones </Link></li>
            <li className="list-group-item"><Link to="/admin/proyectos"> Proyectos </Link></li>
        </ul>
    </>
  )
}
