// src/components/Register.js
import React from 'react';
import Layout from './Layout';
import './styles/Register.css';

const Register = () => (
  <Layout>
    <div className="register-page">
      <h2>Registrarse</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </Layout>
);

export default Register;
