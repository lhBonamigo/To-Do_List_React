
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import { getLocalStorage } from './storage/localstorage';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

function AppRoutes() {
  const Valid = getLocalStorage('Valid');
  const { notification } = useContext(UserContext)
  return (
    <>
      {notification ? <p className='Notification'>{notification}</p> : null}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Valid ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/*' element={<Login />} /> */}
          <Route path='/Cadastro' element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes
