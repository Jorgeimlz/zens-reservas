import React from 'react';
import Layout from './Layout';
import './styles/LoginAdmin.css'


const LoginAdmin = () => (
    <Layout>
      <div className='form'>
      <h4>Ingrese su usuario:</h4>
      <input type="text" />
      <h4>Ingrese su contraseña:</h4>
      <input type="password" />
      <button className='ingresar-button'>Ingresar</button>
      </div>
    </Layout>
  );
  
  export default LoginAdmin;