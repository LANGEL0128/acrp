import './layout.css'

import React, { useContext, useEffect } from 'react'
import { Header } from './tpl/Header'
import { SideBar } from './tpl/SideBar'
import { Footer } from './tpl/Footer'
import { Outlet } from 'react-router-dom';
import { refresh } from './../../services/authService'
import { types } from './../../helpers/types'
import { toast } from 'react-toastify'
import { AuthContext } from '../../helpers/AuthContext'

export const AdminLayout = () => {

  const { user, dispatch } = useContext(AuthContext);

  const refreshToken = async () => {
    if(user.logged) {
      refresh().then(response => {
        const { user, access_token, refresh_token } = response.data;
        dispatch({
          type: types.login,
          payload: {
            ...user, 
            access_token, 
            refresh_token
          }
        })
      }).catch(error => {
        if(error.response.status == 401) {
          dispatch({
            type: types.logout
          });
          toast.error('Ha expirado la sesión');
        } else {
          toast.error('Ha ocurrido un error al refrescar el token. ESTADO: '+error.response?.status);
        }
      });
    }
  };
  useEffect(() => {
    // Refresca el token cada 30 minutos
    // setInterval(refreshToken, 30 * 60 * 1000);
    const intervalId = setInterval(refreshToken, 30 * 60 * 1000);
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
        <Header></Header>
        <div className="row">
            <div className="col-md-3 border-end sidebar">
                <SideBar></SideBar>
            </div>
            <div className="col-md-9 p-5">
                <Outlet />
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}
