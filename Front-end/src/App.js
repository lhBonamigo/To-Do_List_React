import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Provider } from "./components/ui/provider.jsx";
import Cadastro from './pages/Cadastro/Cadastro';
import UserContextProvider from './Functions/UserContext';
import { useContext } from 'react';
import {UserContext} from './Functions/UserContext'

function AppRoutes() {
  const { logged } = useContext(UserContext); // Agora está dentro do provider
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={logged ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Login />} />
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