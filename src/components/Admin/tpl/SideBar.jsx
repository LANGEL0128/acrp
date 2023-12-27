import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext'

export const SideBar = () => {

  const { user } = useContext(AuthContext);

  return (
    <>
        <ul className="list-group list-group-flush text-center">
            <li className="list-group-item"><Link to="/admin"> Inicio </Link></li>
            <li className="list-group-item"><Link to="/admin/publicaciones"> Publicaciones </Link></li>
            <li className="list-group-item"><Link to="/admin/proyectos"> Proyectos </Link></li>
            { user.role == 'Administrador' ? <>
              <li className="list-group-item"><Link to="/admin/eventos"> Eventos </Link></li>
              <li className="list-group-item"><Link to="/admin/delegaciones"> Delegaciones </Link></li>
              <li className="list-group-item"><Link to="/admin/intereses"> Intereses </Link></li>
              <li className="list-group-item"><Link to="/admin/usuarios"> Usuarios </Link></li>
            </> : '' }
        </ul>
    </>
  )
}
