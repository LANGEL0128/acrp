import React, { useEffect, useState } from 'react'
import { listUserSimple } from '../../../services/userService';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export const FrontMemberScreen = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    setLoading(true);
    await listUserSimple().then(response => {
      setUsers(response.data.data);
    }).catch(error => {
      console.log(error);
      toast.error(error.response.data?.message);
    })
    setLoading(false);
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <section className='container my-5'>
      <div className="col-12 animate__animated animate__fadeInLeft">
        <h3>Miembros</h3>
      </div>
      <div className="col-12">
        <div className="row">
          {
            loading 
            ? 
            <>
              <ClipLoader
                color="fff"
                loading={loading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
                Cargando ...
            </>
            :
            <>
              { 
                users.map(user => {
                  return (<div key={ user.uuid } className="card mb-3 animate__animated animate__fadeIn shadow">
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img src={ user.photo } className="img-fluid shadow rounded-start" />
                              </div>
                              <div className="col-md-8 py-2">
                                <div className="card-body">
                                  <h5 className="card-title"> { user.name + ' ' + user.surname } </h5>
                                  <p className="card-text"> <strong>Responsabilidad: </strong> { user.member.responsibility } </p>
                                  <p className="card-text"> <strong>Correo: </strong> { user.member.email_personal } </p>
                                  <p className="card-text"><strong>Delegación: </strong> { user.member.delegation?.name }</p>
                                  <p className="card-text"><strong>Carrera: </strong> { user.member.university_course_name }</p>
                                  <p className="card-text"><Link to={'/miembros/show/' + user.uuid} className='btn btn-success'>Ver Más</Link></p>
                                </div>
                              </div>
                            </div>
                          </div>)
                })
              }
            </>
          }
        </div>
      </div>
    </section>
  )
}
