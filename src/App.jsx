import { useEffect, useReducer } from 'react'
import './App.css'
import { AuthContext } from './helpers/AuthContext'
import { AppRouter } from './routers/AppRouter'
import { authReducer } from './helpers/authReducer'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { app } from './config/app'

const init = () => {
  return JSON.parse(localStorage.getItem('auth_user')) || { logged: false };
}

function App() {
  
  const [ user, dispatch ] = useReducer(authReducer, {}, init)

  useEffect(() => {
    if(!user)
      return;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+user?.access_token;
    localStorage.setItem('auth_user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user,
      dispatch
     }}>
      { app.toastComponent }
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
