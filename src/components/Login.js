// src/components/Login.js
import React from 'react';
import Layout from './Layout';
import './styles/Login.css';

const Login = () => (
  <Layout>
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </Layout>
);

export default Login;
