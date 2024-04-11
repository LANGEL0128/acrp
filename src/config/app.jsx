import { ToastContainer } from 'react-toastify';

export const app = {
    name: 'ACRP',
    api_domain: 'https://luisangel.fullstackcolombia.com.co/api/',
    // public_url: '/acrp',
    // api_domain: 'http://localhost:8000/api/',
    public_url: '',
    showError: (error) => {
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un estado fuera de la gama 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió ninguna respuesta
          console.log(error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.log('Error', error.message);
        }
    },
    toastComponent: <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />,
    url_login: '/admin/login',
    url_landing: '/admin',
}