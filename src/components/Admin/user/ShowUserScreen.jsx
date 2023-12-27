import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImgDefault from '../../../assets/default.jpg'
import { ClipLoader } from 'react-spinners';
import { types } from '../../../helpers/types';
import { app } from '../../../config/app';
import { showUser } from '../../../services/userService';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../helpers/AuthContext';

export const ShowUserScreen = () => {
    
    const tags_name = 'usuarios';
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [mails, setMails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const getUser = async () => {
        setLoading(true);
        await showUser(params.id).then(response => {
            setUser(response.data.data);
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
        getUser();
    }, []);

    useEffect(() => {
        if(user.role == 'Miembro') {
            let emails = user.member?.mails.map(mail => mail.email);
            setMails(emails);
            let phones = user.member?.phones.map(phone => phone.phone);
            setPhones(phones);
            let interests = user.member?.interests.map(interest => interest.name);
            setInterests(interests);
        }
    }, [user]);

    return (
        <div className="card animate__animated animate__fadeIn shadow-sm">
            <div className="card-header">
                <h2>Ver Usuario</h2>
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
                            <img src={ user.photo ? user.photo : ImgDefault } alt="" className='img-thumbnail'/>
                        </div>
                        <div className="col-md-6">
                            <p><em>Nombre: </em> { user.name + ' ' + user.surname + ' ' + user.second_surname}</p>
                            <p><em>Usuario: </em> { user.username }</p>
                        </div>
                        {
                            (user.role == 'Miembro') ? 
                            <>
                                <h5>Datos de Miembro</h5>
                                <div className="col-12">
                                    <p><em>Género: </em> { user.member.gender }</p>
                                    <p><em>Carnet de Identidad: </em> { user.member.ci }</p>
                                    <p><em>Delegación: </em> { user.member.delegation.name }</p>
                                    <p><em>Correo Institucional: </em> { user.member.email_institutional }</p>
                                    <p><em>Correo Personal: </em> { user.member.email_personal }</p>
                                    <p><em>Otros Correos: </em> { mails.join(',') }</p>
                                    <p><em>Centro de Trabajo: </em> { user.member.fullname_workplace }</p>
                                    <p><em>Abreviatura del Centro: </em> { user.member.abbreviated_name_workplace }</p>
                                    <p><em>Teléfono del Centro: </em> { user.member.phone_workplace }</p>
                                    <p><em>Celular del Centro: </em> { user.member.cellphone_workplace }</p>
                                    <p><em>Dirección del Centro: </em> { user.member.postal_address_workplace }</p>
                                    <p><em>Dirección Particular: </em> { user.member.home_address }</p>
                                    <p><em>Teléfono Particular: </em> { user.member.home_phone }</p>
                                    <p><em>Celular Particular: </em> { user.member.home_cellphone }</p>
                                    <p><em>Otros Teléfonos: </em> { phones.join(',') }</p>
                                    <p><em>Título Universitario: </em> { user.member.university_degree }</p>
                                    <p><em>Carrera: </em> { user.member.university_course_name }</p>
                                    <p><em>Centro de Estudio Universitarios: </em> { user.member.university_study_center }</p>
                                    <p><em>Año de Graduación: </em> { user.member.university_graduate_year }</p>
                                    <p><em>Ciudad: </em> { user.member.university_city }</p>
                                    <p><em>País: </em> { user.member.university_country }</p>
                                    <p><em>Título Maestría: </em> { user.member.master_title_achieved }</p>
                                    <p><em>Año Maestría: </em> { user.member.master_year }</p>
                                    <p><em>Centro de Estudios Maestría: </em> { user.member.master_study_center }</p>
                                    <p><em>Ciudad Maestría: </em> { user.member.master_city }</p>
                                    <p><em>País Maestría: </em> { user.member.master_country }</p>
                                    <p><em>Título de Doctorado: </em> { user.member.doctoral_degree_achieved }</p>
                                    <p><em>Año de Doctorado: </em> { user.member.doctoral_year }</p>
                                    <p><em>Ciudad de Doctorado: </em> { user.member.doctoral_city }</p>
                                    <p><em>País de Doctorado: </em> { user.member.doctoral_country }</p>
                                    <p><em>Categoría Docente: </em> { user.member.docent_category }</p>
                                    <p><em>Año Docente: </em> { user.member.docent_year }</p>
                                    <p><em>Categoría Científica: </em> { user.member.scientific_category }</p>
                                    <p><em>Año Científica: </em> { user.member.scientific_year }</p>
                                    <p><em>Intereses: </em> { interests.join(', ') }</p>
                                    <p><em>Otros Intereses: </em> { user.member.others_interest }</p>
                                </div>
                            </> : ''
                        }
                        <div className="col-12 d-flex justify-content-end">
                            <Link to={"/admin/"+tags_name} className='btn btn-secondary' >Atrás</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
