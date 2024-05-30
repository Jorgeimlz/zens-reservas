// src/components/Login.js
import React from 'react';
import Layout from './Layout';
import './styles/Login.css';

const Login = () => (
  <Layout>
    <div className="login-page">
      <h2>RESERVAR</h2>
    </div>
    <div className="form">
      <form>
        <div className="form-grid">
          <div className="column">
            <p>Nombre:</p>
            <input type="text" placeholder="Nombre" />
            <p>Apellido:</p>
            <input type="text" placeholder="Apellido" />
            <p>Número de asistentes:</p>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
          <div className="column">
            <p>Celular:</p>
            <input type="text" placeholder="Número celular" />
            <p>Hora de reserva:</p>
            <select>
              <option>21:00</option>
              <option>21:30</option>
              <option>22:00</option>
              <option>22:30</option>
            </select>
          </div>
        </div>
        <button type="submit" className='reservar-button'>Reservar</button>
      </form>
    </div>
  </Layout>
);

export default Login;


