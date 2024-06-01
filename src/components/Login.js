import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import './styles/Login.css';

const Login = () => {
  const { idFiesta } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState('1');
  const [telefono, setTelefono] = useState('');
  const [hora, setHora] = useState('21:00');

  const postAPI = async (e) => {
    e.preventDefault();
    const reserva = {
      idReserva: 0, // asumiendo que el backend maneja la generación de este ID
      idFiesta: parseInt(idFiesta),
      nombreReserva: nombre,
      apellidoReserva: apellido,
      numeroPersonas: numeroPersonas,
      hora: hora,
      telefono: telefono,
    };

    try {
      const respuesta = await fetch('/api/Reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      if (!respuesta.ok) {
        throw new Error('Network response was not ok');
      }
      const resultado = await respuesta.json();
      alert('Reserva realizada:', resultado);
    } catch (error) {
      alert('Error al realizar la reserva:', error);
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <h2>RESERVAR</h2>
      </div>
      <div className="genReserva">
        <form onSubmit={postAPI}>
          <div className="genReserva-grid">
            <div className="column">
              <p>Nombre:</p>
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <p>Apellido:</p>
              <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
              <p>Número de asistentes:</p>
              <select value={numeroPersonas} onChange={(e) => setNumeroPersonas(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="column">
              <p>Celular:</p>
              <input type="text" placeholder="Número celular" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              <p>Hora de reserva:</p>
              <select value={hora} onChange={(e) => setHora(e.target.value)}>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
              </select>
            </div>
          </div>
          <button type="submit" className='reservar-button'>Reservar</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
