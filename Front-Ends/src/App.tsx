import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Provider } from "./components/ui/provider";
import Cadastro from './pages/Cadastro/Cadastro';
import UserContextProvider from './hooks/UserContext';
import { createLocalStorage, getLocalStorage } from './services/storage/localstorage';
import { useEffect, useState } from 'react';


function AppRoutes() {
  const Valid = getLocalStorage('Valid');

  console.log(Valid); // Agora será atualizado corretamente
   return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={Valid ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/*' element={<Login />} /> */}
        <Route path='/Cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </Provider>
  );
}

export default App;