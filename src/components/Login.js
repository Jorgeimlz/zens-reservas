import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import './styles/Login.css';
import { generarVoucher } from './actions/veriCredenciales';
import { enviarCorreo } from './actions/enviarCorreo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { idFiesta } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState('1');
  const [telefono, setTelefono] = useState('');
  const [hora, setHora] = useState('21:00');
  const [reservas, setReservas] = useState([]); // Almacena las reservas con el idFiesta para controlar aforo
  const [aforo, setAforo] = useState(0); // Almacena el total de personas

  useEffect(() => {
    // Obtener reservas para controlar aforo
    const getReservas = async () => {
      try {
        const id = parseInt(idFiesta);
        const url = await fetch(`/api/Reservas/GetAllIdFiesta/${id}`);
        const res = await url.json();
        setReservas(res); 
        // Sumar el total de personas de las reservas
        const total = res.reduce((sum, reserva) => sum + parseInt(reserva.numeroPersonas), 0);
        console.log('Personas reservadas:'+ total + ' de 10');
        setAforo(total);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    getReservas(); 
  }, [idFiesta]); 

  const limpiarCampos = () => {
    setNombre('');
    setApellido('');
    setNumeroPersonas('1');
    setTelefono('');
    setHora('21:00');
  };

  // Generar voucher random
  const voucherG = generarVoucher(); 

  // Post reserva
  const postAPI = async (e) => {
    e.preventDefault();

    const limiteAforo = 10;
    if (aforo + parseInt(numeroPersonas) > limiteAforo) {
      toast.error('No hay suficiente aforo disponible para esta reserva.', { position: "top-center" });
      return;
    }

    const reserva = {
      idReserva: 0, 
      idFiesta: parseInt(idFiesta),
      vaucher: voucherG, 
      nombreReserva: nombre,
      apellidoReserva: apellido,
      numeroPersonas: numeroPersonas, // Enviar como cadena
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
        const errorText = await respuesta.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const resultado = await respuesta.json();
      toast.success("TU VOUCHER DE RESERVA ES: " + voucherG, { position: "top-center" });
      limpiarCampos(); // Limpia los campos después de la reserva exitosa

      // Actualizar el total de personas
      setAforo(prevTotal => prevTotal + parseInt(numeroPersonas));
      // Actualizar la lista de reservas, asegurándose de que `prevReservas` sea siempre un array
      setReservas(prevReservas => Array.isArray(prevReservas) ? [...prevReservas, reserva] : [reserva]);
    } catch (error) {
      toast.error('Error al realizar la reserva: ' + error.message, { position: "top-center" });
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
      <ToastContainer />
    </Layout>
  );
};

export default Login;
