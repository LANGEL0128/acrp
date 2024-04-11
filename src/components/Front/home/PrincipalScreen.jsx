import React from 'react'
import ImgDefault from '../../../assets/default.jpg'
import ImgBanner from '../../../assets/banner-1.png'

export const PrincipalScreen = () => {
  return (
    <div className='container'>
        <section className='row'>
            <img src={ ImgBanner } alt="" width='100%' height='400'/>
            <h2 className='my-3 animate__animated animate__bounceInDown'>Asociación Cubana de Reconocimiento de Patrones</h2>
            <hr />
            <section className="col-12 bg-dark text-white text-center p-3 animate__animated animate__bounceInLeft">
                <h2>Introducción</h2>
                <p>La Asociación Cubana de Reconocimiento de Patrones es una organización dedicada a la promoción de la investigación y el desarrollo en el campo del reconocimiento de patrones. Nuestro objetivo es proporcionar un espacio para el intercambio de experiencias, difundir resultados de investigación y promover la cooperación entre las instituciones participantes.</p>
                <p>Nuestro trabajo se basa en la creencia de que el reconocimiento de patrones tiene un gran potencial para mejorar diversas áreas, desde la inteligencia artificial hasta la medicina y la biología. Trabajamos incansablemente para fomentar la investigación en este campo y para facilitar la colaboración entre los investigadores y las instituciones de todo el mundo.</p>
            </section>
            <section className="col-12 text-center p-3 animate__animated animate__bounceInLeft">
                <h2>Eventos y Actividades</h2>
                <p>Como parte de nuestras actividades, participamos en una variedad de eventos y talleres internacionales relacionados con el reconocimiento de patrones. Estos incluyen el Congreso Internacional sobre Inteligencia Artificial y Reconocimiento de Patrones IWAIPR 2023, el Simposio Internacional sobre Transformación Digital, y el Taller Internacional sobre Software Libre y Tecnologías Emergentes.</p>
                <p>Además de estos eventos, también organizamos nuestros propios seminarios y talleres para discutir los últimos avances en el campo del reconocimiento de patrones. Estos eventos proporcionan una excelente oportunidad para que los investigadores compartan sus ideas y aprendan de los expertos en el campo.</p>
            </section>
            <section className="col-12 bg-dark text-white text-center p-3 animate__animated animate__bounceInLeft">
                <h2>Noticias y Actualizaciones</h2>
                <p>Nos esforzamos por mantener a nuestra comunidad informada sobre las últimas noticias y desarrollos en nuestro campo. En nuestra sección de noticias, encontrará artículos y actualizaciones sobre los últimos descubrimientos, las últimas investigaciones y los próximos eventos.</p>
                <p>Además de esto, también publicamos regularmente una serie de preguntas frecuentes (FAQ) en nuestra página web. Estas FAQs responden a las preguntas más comunes que podrían tener nuestros miembros y visitantes sobre el reconocimiento de patrones.</p>
            </section>
            <section className="col-12 text-center p-3 animate__animated animate__bounceInLeft">
                <h2>Contacto</h2>
                <p>Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros. Puedes hacerlo a través de los siguientes medios:</p>
                <ul style={{ listStyle: 'none' }}>
                    <li>Teléfono: +53 7 835 8265</li>
                    <li>Email: uciencia@uci.cu</li>
                    <li>Dirección: Desarrollado por UCI.</li>
                </ul>
                <p>Esperamos trabajar contigo para impulsar la innovación en el campo del reconocimiento de patrones.</p>
            </section>
        </section>
    </div>
  )
}
