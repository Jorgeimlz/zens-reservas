import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import './styles/LoginAdmin.css';
import { ingresar } from './actions/veriCredenciales';

const LoginAdmin = () => {
  const history = useHistory();

  const handleLogin = () => {
    ingresar(history);
  };

  return (
    <Layout>
      <div className='form'>
        <h4>Ingrese su usuario:</h4>
        <input type="text" id='user' />
        <h4>Ingrese su contraseña:</h4>
        <input type="password" id='pswd' />
        <button className='ingresar-button' onClick={handleLogin}>Ingresar</button>
      </div>
    </Layout>
  );
};

export default LoginAdmin;
