// src/components/Login.js
import React from 'react';
import Layout from './Layout';
import './styles/Login.css';

const Login = () => (
  <Layout>
    <div className="login-page">
      <h2>RESERVAR</h2>
      <form>
        <input type="text" placeholder="Nombre"/>
        <input type="text" placeholder="Apellido"/>
        <input type="number" placeholder="Numero Personas"/>
        <input type="text" placeholder="Numero celular" />
        <input type="text" placeholder="Hora"/>
        <button type="submit">reservar</button>
      </form>
    </div>
  </Layout>
);

export default Login;
