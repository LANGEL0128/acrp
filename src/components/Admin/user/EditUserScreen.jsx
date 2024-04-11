import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { app } from '../../../config/app';
import { types } from '../../../helpers/types';
import { listDelegationSimple } from '../../../services/delegationService';
import { listInterestSimple } from '../../../services/interestService';
import { showUser, updateUser } from '../../../services/userService';
import { AuthContext } from '../../../helpers/AuthContext';

export const EditUserScreen = () => {

  const tags_name = 'usuarios';
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [delegations, setDelegations] = useState([]);
  const [interests, setInterests] = useState([]);
  const [user, setUser] = useState({});
  const { dispatch } = useContext(AuthContext);

  const getDelegations = async () => {
    setLoading(true);
    await listDelegationSimple().then(response => {
      setDelegations(response.data.data);
    }).catch(error => {
      console.log(error);
      toast.error(error.response?.message);
    });
    setLoading(false);
  }

  const getInterests = async () => {
    setLoading(true);
    await listInterestSimple().then(response => {
      setInterests(response.data.data);
    }).catch(error => {
      console.log(error);
      toast.error(error.response?.message);
    });
    setLoading(false);
  }

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

  const handleEdit = async (data) => {
    setLoading(true);
    let formData = new FormData();
    const fileInput = document.querySelector('#photo');
    let photo = null;
    if (fileInput.files.length > 0) {
      photo = fileInput.files[0];
      formData.append('photo', photo);
    }
    let interetsSelected = [];
    const checkboxes = document.querySelectorAll('input[name="interests"]');
    interetsSelected = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    formData.append('name', data.name ?? '');
    formData.append('surname', data.surname ?? '');
    formData.append('second_surname', data.second_surname ?? '');
    formData.append('username', data.username ?? '');
    formData.append('password', data.password ?? '');
    formData.append('delegation', data.delegation ?? '');
    formData.append('email_institutional', data.email_institutional ?? '');
    formData.append('email_personal', data.email_personal ?? '');
    formData.append('mails', data.mails ?? '');
    formData.append('gender', data.gender ?? '');
    formData.append('ci', data.ci ?? '');
    formData.append('fullname_workplace', data.fullname_workplace ?? '');
    formData.append('abbreviated_name_workplace', data.abbreviated_name_workplace ?? '');
    formData.append('phone_workplace', data.phone_workplace ?? '');
    formData.append('cellphone_workplace', data.cellphone_workplace ?? '');
    formData.append('postal_address_workplace', data.postal_address_workplace ?? '');
    formData.append('home_address', data.home_address ?? '');
    formData.append('home_phone', data.home_phone ?? '');
    formData.append('home_cellphone', data.home_cellphone ?? '');
    formData.append('phones', data.phones ?? '');
    formData.append('university_degree', data.university_degree ?? '');
    formData.append('university_course_name', data.university_course_name ?? '');
    formData.append('university_study_center', data.university_study_center ?? '');
    formData.append('university_graduate_year', data.university_graduate_year ?? '');
    formData.append('university_city', data.university_city ?? '');
    formData.append('university_country', data.university_country ?? '');
    formData.append('master_title_achieved', data.master_title_achieved ?? '');
    formData.append('master_year', data.master_year ?? '');
    formData.append('master_study_center', data.master_study_center ?? '');
    formData.append('master_city', data.master_city ?? '');
    formData.append('master_country', data.master_country ?? '');
    formData.append('doctoral_degree_achieved', data.doctoral_degree_achieved ?? '');
    formData.append('doctoral_year', data.doctoral_year ?? '');
    formData.append('doctoral_study_center', data.doctoral_study_center ?? '');
    formData.append('doctoral_city', data.doctoral_city ?? '');
    formData.append('doctoral_country', data.doctoral_country ?? '');
    formData.append('docent_category', data.docent_category ?? '');
    formData.append('docent_year', data.docent_year ?? '');
    formData.append('scientific_category', data.scientific_category ?? '');
    formData.append('scientific_year', data.scientific_year ?? '');
    formData.append('others_interest', data.others_interest ?? '');
    formData.append('description', data.description ?? '');
    formData.append('responsability', data.responsability ?? '');
    formData.append('interests', interetsSelected);
    await updateUser(params.id, formData).then(response => {
      toast.success(response.data?.message);
      navigate(-1);
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
    getDelegations();
    getInterests();
    getUser();
  }, []);

  useEffect(() => {
    let mails = [];
    if(user.member?.mails) {
      mails = user.member.mails.map(mail => mail.email);
    }
    let phones = [];
    if(user.member?.phones) {
      phones = user.member.phones.map(phone => phone.phone);
    }
    if(user.member?.interests !== undefined) {
      let new_list_interests = interests.map(interest => {
        let isSelected = false;
        let ids = [];
        ids = user.member.interests.map(inter => inter.id);
        if(ids.includes(interest.id)) {
          isSelected = true;
        }
        return {
          ...interest,
          isSelected: isSelected
        };
      });
      setInterests(new_list_interests);
    }
    setValue('name', user.name);
    setValue('surname', user.surname);
    setValue('second_surname', user.second_surname);
    setValue('username', user.username);
    setValue('password', user.password);
    setValue('delegation', user.member?.delegation.uuid);
    setValue('email_institutional', user.member?.email_institutional);
    setValue('email_personal', user.member?.email_personal);
    setValue('mails', mails.join(','));
    setValue('gender', user.member?.gender);
    setValue('ci', user.member?.ci);
    setValue('fullname_workplace', user.member?.fullname_workplace);
    setValue('abbreviated_name_workplace', user.member?.abbreviated_name_workplace);
    setValue('phone_workplace', user.member?.phone_workplace);
    setValue('cellphone_workplace', user.member?.cellphone_workplace);
    setValue('postal_address_workplace', user.member?.postal_address_workplace);
    setValue('home_address', user.member?.home_address);
    setValue('home_phone', user.member?.home_phone);
    setValue('home_cellphone', user.member?.home_cellphone);
    setValue('phones', phones.join(','));
    setValue('university_degree', user.member?.university_degree);
    setValue('university_course_name', user.member?.university_course_name);
    setValue('university_study_center', user.member?.university_study_center);
    setValue('university_graduate_year', user.member?.university_graduate_year);
    setValue('university_city', user.member?.university_city);
    setValue('university_country', user.member?.university_country);
    setValue('master_title_achieved', user.member?.master_title_achieved);
    setValue('master_year', user.member?.master_year);
    setValue('master_study_center', user.member?.master_study_center);
    setValue('master_city', user.member?.master_city);
    setValue('master_country', user.member?.master_country);
    setValue('doctoral_degree_achieved', user.member?.doctoral_degree_achieved);
    setValue('doctoral_year', user.member?.doctoral_year);
    setValue('doctoral_study_center', user.member?.doctoral_study_center);
    setValue('doctoral_city', user.member?.doctoral_city);
    setValue('doctoral_country', user.member?.doctoral_country);
    setValue('docent_category', user.member?.docent_category);
    setValue('docent_year', user.member?.docent_year);
    setValue('scientific_category', user.member?.scientific_category);
    setValue('scientific_year', user.member?.scientific_year);
    setValue('others_interest', user.member?.others_interest);
    setValue('responsibility', user.member?.responsibility);
  }, [user]);

  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>Editar Usuario</h2>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(handleEdit)} className='row'>
              <h4>Datos de Usuario</h4>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre*</label>
                <input type="text" className={ 'form-control' + (errors.name ? ' is-invalid': '') } id="name" name='name' { ...register('name', { required: true }) } placeholder="Nombre" />
                {errors.name && errors.name.type === "required" && (
                    <span className='invalid-feedback'>El nombre es requerido</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="surname" className="form-label">1er Apellido*</label>
                <input type="text" className={ 'form-control' + (errors.surname ? ' is-invalid': '') } id="surname" name='surname' { ...register('surname', { required: true }) } placeholder="1er Apellido" />
                {errors.surname && errors.surname.type === "required" && (
                    <span className='invalid-feedback'>El primer apellido es requerido</span>
                )} 
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="second_surname" className="form-label">2do Apellido*</label>
                <input type="text" className={ 'form-control' + (errors.second_surname ? ' is-invalid': '') } id="second_surname" name='second_surname' { ...register('second_surname', { required: true }) } placeholder="2do Apellido" />
                {errors.second_surname && errors.second_surname.type === "required" && (
                    <span className='invalid-feedback'>El segundo apellido es requerido</span>
                )} 
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photo" className="form-label">Imagen</label>
                <input type="file" className={ 'form-control' } id="photo" name='photo' { ...register('photo') } placeholder="Imagen" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="username" className="form-label">Usuario*</label>
                <input type="text" className={ 'form-control' + (errors.username ? ' is-invalid': '') } id="username" name='username' { ...register('username', { required: true }) } placeholder="Usuario" />
                {errors.username && errors.username.type === "required" && (
                    <span className='invalid-feedback'>La fecha es requerida</span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Contrase&ntilde;a</label>
                <input type="password" className={ 'form-control' } autoComplete='off' id="password" name='password' { ...register('password') } placeholder="Contrase&ntilde;a" />
              </div>
              {
                user.role == 'Miembro' ? <>
                  <hr />
                  <h4>Datos de Miembro</h4>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="delegation" className="form-label">Delegaci&oacute;n*</label>
                    <select className={ 'form-select' + (errors.delegation ? ' is-invalid': '') } id="delegation" name='delegation' { ...register('delegation', { required: true }) } placeholder="Delegaci&oacute;n" >
                      <option value=""> -- Seleccionar -- </option>
                      {
                        delegations.map(delegation => {
                          return (<option key={ delegation.uuid } value={ delegation.uuid } >{ delegation.name }</option>);
                        })
                      }
                    </select>
                    {errors.delegation && errors.delegation.type === "required" && (
                        <span className='invalid-feedback'>La delegaci&oacute;n es requerida</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="gender" className="form-label">Género*</label>
                    <select className={ 'form-select' + (errors.gender ? ' is-invalid': '') } id="gender" name='gender' { ...register('gender', { required: true }) } placeholder="Delegaci&oacute;n" >
                      <option value=""> -- Seleccionar -- </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                    {errors.gender && errors.gender.type === "required" && (
                        <span className='invalid-feedback'>El género es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="ci" className="form-label">Carnet de Identidad*</label>
                    <input type="text" className={ 'form-control' + (errors.ci ? ' is-invalid': '') } id="ci" name='ci' { ...register('ci', { required: true }) } placeholder="Carnet de Identidad" />
                    {errors.ci && errors.ci.type === "required" && (
                        <span className='invalid-feedback'>El carnet de identidad es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="responsibility" className="form-label">Responsabilidad*</label>
                    <input type="text" className={ 'form-control' + (errors.responsibility ? ' is-invalid': '') } id="responsibility" name='responsibility' { ...register('responsibility', { required: true }) } placeholder="Responsabilidad" />
                    {errors.responsibility && errors.responsibility.type === "required" && (
                        <span className='invalid-feedback'>La responsabilidad es requerida</span>
                    )}
                  </div>
                  <h5>Datos de Contacto</h5>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email_institutional" className="form-label">Correo Institucional*</label>
                    <input type="text" className={ 'form-control' + (errors.email_institutional ? ' is-invalid': '') } id="email_institutional" name='email_institutional' { ...register('email_institutional', { required: true }) } placeholder="Correo Institucional" />
                    {errors.email_institutional && errors.email_institutional.type === "required" && (
                        <span className='invalid-feedback'>El correo institucional es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email_personal" className="form-label">Correo Personal</label>
                    <input type="text" className={ 'form-control' } id="email_personal" name='email_personal' { ...register('email_personal') } placeholder="Correo Personal" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="mails" className="form-label">Otros Correos</label>
                    <input type="text" className={ 'form-control' } id="mails" name='mails' { ...register('mails') } placeholder="Otros Correos" />
                    <span className='text-muted'>Los correos separados por coma, Ej: correo1@gmail.com,correo2@gmail.com,correo3@gmail.com</span>
                  </div>
                  <h5>Datos de Centro de Trabajo</h5>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullname_workplace" className="form-label">Centro de Trabajo*</label>
                    <input type="text" className={ 'form-control' + (errors.fullname_workplace ? ' is-invalid': '') } id="fullname_workplace" name='fullname_workplace' { ...register('fullname_workplace', { required: true }) } placeholder="Centro de Trabajo" />
                    {errors.fullname_workplace && errors.fullname_workplace.type === "required" && (
                        <span className='invalid-feedback'>El centro de trabajo es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="abbreviated_name_workplace" className="form-label">Abreviatura del Centro de Trabajo</label>
                    <input type="text" className={ 'form-control' } id="abbreviated_name_workplace" name='abbreviated_name_workplace' { ...register('abbreviated_name_workplace') } placeholder="Abreviatura del Centro de Trabajo" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone_workplace" className="form-label">Teléfono*</label>
                    <input type="tel" className={ 'form-control' + (errors.phone_workplace ? ' is-invalid': '') } id="phone_workplace" name='phone_workplace' { ...register('phone_workplace', { required: true }) } placeholder="Teléfono" />
                    {errors.phone_workplace && errors.phone_workplace.type === "required" && (
                        <span className='invalid-feedback'>El teléfono es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cellphone_workplace" className="form-label">Celular</label>
                    <input type="tel" className={ 'form-control' } id="cellphone_workplace" name='cellphone_workplace' { ...register('cellphone_workplace') } placeholder="Celular" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="postal_address_workplace" className="form-label">Direcci&oacute;n Postal*</label>
                    <textarea type="text" className={ 'form-control' + (errors.postal_address_workplace ? ' is-invalid': '') } id="postal_address_workplace" name='postal_address_workplace' { ...register('postal_address_workplace', { required: true }) } placeholder="Direcci&oacute;n Postal" />
                    {errors.postal_address_workplace && errors.postal_address_workplace.type === "required" && (
                        <span className='invalid-feedback'>La direcci&oacute;n es requerida</span>
                    )}
                  </div>
                  <h5>Datos Particulares de Contacto</h5>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="home_address" className="form-label">Direcci&oacute;n Particular*</label>
                    <textarea type="text" className={ 'form-control' + (errors.home_address ? ' is-invalid': '') } id="home_address" name='home_address' { ...register('home_address', { required: true }) } placeholder="Direcci&oacute;n Particular" />
                    {errors.home_address && errors.home_address.type === "required" && (
                        <span className='invalid-feedback'>La direcci&oacute;n es requerida</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="home_phone" className="form-label">Teléfono</label>
                    <input type="text" className={ 'form-control' } id="home_phone" name='home_phone' { ...register('home_phone') } placeholder="Teléfono" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="home_cellphone" className="form-label">Celular</label>
                    <input type="text" className={ 'form-control' } id="home_cellphone" name='home_cellphone' { ...register('home_cellphone') } placeholder="Celular" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phones" className="form-label">Otros Teléfonos</label>
                    <input type="text" className={ 'form-control' } id="phones" name='phones' { ...register('phones') } placeholder="Otros Teléfonos" />
                    <span className='text-muted'>Los teléfonos separados por coma, Ej: 45453643,76554477,22669933</span>
                  </div>
                  <h5>Datos estudios universitarios</h5>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_degree" className="form-label">Título*</label>
                    <input type="text" className={ 'form-control' + (errors.university_degree ? ' is-invalid': '') } id="university_degree" name='university_degree' { ...register('university_degree', { required: true }) } placeholder="Título" />
                    {errors.university_degree && errors.university_degree.type === "required" && (
                        <span className='invalid-feedback'>El título es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_course_name" className="form-label">Carrera*</label>
                    <input type="text" className={ 'form-control' + (errors.university_course_name ? ' is-invalid': '') } id="university_course_name" name='university_course_name' { ...register('university_course_name', { required: true }) } placeholder="Carrera" />
                    {errors.university_course_name && errors.university_course_name.type === "required" && (
                        <span className='invalid-feedback'>La carrera es requerida</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_study_center" className="form-label">Centro de Estudios*</label>
                    <input type="text" className={ 'form-control' + (errors.university_study_center ? ' is-invalid': '') } id="university_study_center" name='university_study_center' { ...register('university_study_center', { required: true }) } placeholder="Centro de Estudios" />
                    {errors.university_study_center && errors.university_study_center.type === "required" && (
                        <span className='invalid-feedback'>El centro de estudios es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_graduate_year" className="form-label">Año de Graduación*</label>
                    <input type="number" className={ 'form-control' + (errors.university_graduate_year ? ' is-invalid': '') } id="university_graduate_year" name='university_graduate_year' { ...register('university_graduate_year', { required: true }) } placeholder="Año de graduación" />
                    {errors.university_graduate_year && errors.university_graduate_year.type === "required" && (
                        <span className='invalid-feedback'>El año de graduación es requerido</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_city" className="form-label">Ciudad*</label>
                    <input type="text" className={ 'form-control' + (errors.university_city ? ' is-invalid': '') } id="university_city" name='university_city' { ...register('university_city', { required: true }) } placeholder="Ciudad" />
                    {errors.university_city && errors.university_city.type === "required" && (
                        <span className='invalid-feedback'>La ciudad es requerida</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="university_country" className="form-label">País*</label>
                    <input type="text" className={ 'form-control' + (errors.university_country ? ' is-invalid': '') } id="university_country" name='university_country' { ...register('university_country', { required: true }) } placeholder="País" />
                    {errors.university_country && errors.university_country.type === "required" && (
                        <span className='invalid-feedback'>El país es requerido</span>
                    )}
                  </div>
                  <h5>Datos de estudios de maestría</h5>
                  <small>Si no tiene una maestría, déjelo en blanco.</small><br/>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="master_title_achieved" className="form-label">Título</label>
                    <input type="text" className={ 'form-control' } id="master_title_achieved" name='master_title_achieved' { ...register('master_title_achieved') } placeholder="Título" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="master_year" className="form-label">Año de Maestría</label>
                    <input type="number" className={ 'form-control' } id="master_year" name='master_year' { ...register('master_year') } placeholder="Año de Maestría" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="master_study_center" className="form-label">Centro de Estudios</label>
                    <input type="text" className={ 'form-control' } id="master_study_center" name='master_study_center' { ...register('master_study_center') } placeholder="Centro de Estudios" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="master_city" className="form-label">Ciudad</label>
                    <input type="text" className={ 'form-control' } id="master_city" name='master_city' { ...register('master_city') } placeholder="Ciudad" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="master_country" className="form-label">País</label>
                    <input type="text" className={ 'form-control' } id="master_country" name='master_country' { ...register('master_country') } placeholder="País" />
                  </div>
                  <h5>Datos de estudios doctorales</h5>
                  <small>Si no tiene doctorado, déjelo en blanco.</small><br/>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctoral_degree_achieved" className="form-label">Título</label>
                    <input type="text" className={ 'form-control' } id="doctoral_degree_achieved" name='doctoral_degree_achieved' { ...register('doctoral_degree_achieved') } placeholder="Título" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctoral_year" className="form-label">Año de Doctorado</label>
                    <input type="number" className={ 'form-control' } id="doctoral_year" name='doctoral_year' { ...register('doctoral_year') } placeholder="Año de Doctorado" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctoral_study_center" className="form-label">Centro de Estudios</label>
                    <input type="text" className={ 'form-control' } id="doctoral_study_center" name='doctoral_study_center' { ...register('doctoral_study_center') } placeholder="Centro de Estudios" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctoral_city" className="form-label">Ciudad</label>
                    <input type="text" className={ 'form-control' } id="doctoral_city" name='doctoral_city' { ...register('doctoral_city') } placeholder="Ciudad" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctoral_country" className="form-label">País</label>
                    <input type="text" className={ 'form-control' } id="doctoral_country" name='doctoral_country' { ...register('doctoral_country') } placeholder="País" />
                  </div>
                  <h5>Datos sobre categorías docentes y científicas</h5>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="docent_category" className="form-label">Categoría Docente</label>
                    <input type="text" className={ 'form-control' } id="docent_category" name='docent_category' { ...register('docent_category') } placeholder="Categoría Docente" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="docent_year" className="form-label">Año</label>
                    <input type="number" className={ 'form-control' } id="docent_year" name='docent_year' { ...register('docent_year') } placeholder="Año" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="scientific_category" className="form-label">Categoría Científica</label>
                    <input type="text" className={ 'form-control' } id="scientific_category" name='scientific_category' { ...register('scientific_category') } placeholder="Categoría Científica" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="scientific_year" className="form-label">Año</label>
                    <input type="number" className={ 'form-control' } id="scientific_year" name='scientific_year' { ...register('scientific_year') } placeholder="Año" />
                  </div>
                  <h5>Intereses</h5>
                  {
                      interests.map((interest) => {
                        return (<label className='col-md-6' key={ interest.id } >
                            <input type="checkbox" name="interests" defaultChecked={ interest?.isSelected }
                            multiple
                            value={ interest.id } />{ interest.name }
                          </label>)
                      })
                  }
                  <div className="col-md-12 mb-3">
                    <label htmlFor="others_interest" className="form-label">Otros Intereses</label>
                    <textarea type="text" className={ 'form-control'  } id="others_interest" name='others_interest' { ...register('others_interest') } placeholder="Otros Intereses" />
                  </div>
                </> : ''
              }
              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-warning mx-2">
                  <ClipLoader
                      color="fff"
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
                  Editar
                </button>
                <Link to={"/admin/"+tags_name} className='btn btn-secondary' >Cancelar</Link>
              </div>
            </form>
        </div>
    </div>
  )
}
