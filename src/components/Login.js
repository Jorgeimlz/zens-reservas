import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import Layout from './Layout';
import './styles/Login.css';
import { generarVoucher } from './actions/veriCredenciales';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = () => {
  const { idFiesta } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState('1');
  const [telefono, setTelefono] = useState('');
  const [hora, setHora] = useState('21:00');
  const [reservas, setReservas] = useState([]);
  const [aforo, setAforo] = useState(0);
  const [fechaFiesta, setFechaFiesta] = useState('');
  const history = useHistory(); 

  useEffect(() => {
    const getFechat = async () => {
      try {
        const idF = parseInt(idFiesta, 10);
        const url = `/api/fiestas/${idF}`;
        const respu = await fetch(url);
        if (!respu.ok) {
          throw new Error(`Error fetching data: ${respu.statusText}`);
        }
        const fiestaData = await respu.json();
        setFechaFiesta(fiestaData.fecha); 
        console.log(fiestaData.fecha);
      } catch (error) {
        console.error('Error al obtener la fecha de la fiesta:', error);
      }
    };

    const getReservas = async () => {
      try {
        const id = parseInt(idFiesta, 10);
        const url = await fetch(`/api/reservas/GetAllIdFiesta/${id}`);
        if (!url.ok) {
          throw new Error(`Error fetching data: ${url.statusText}`);
        }
        const res = await url.json();
        setReservas(res);
        const total = res.reduce((sum, reserva) => sum + parseInt(reserva.numeroPersonas, 10), 0);
        setAforo(total);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    getFechat();
    getReservas();
  }, [idFiesta]); 

  const limpiarCampos = () => {
    setNombre('');
    setApellido('');
    setNumeroPersonas('1');
    setTelefono('');
    setHora('21:00');
  };

  const postAPI = async (e) => {
    e.preventDefault();
    const limiteAforo = 25;
    if (aforo + parseInt(numeroPersonas, 10) > limiteAforo) {
      MySwal.fire({
        title: 'Error',
        text: 'No hay suficiente aforo disponible para esta reserva.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-button',
        },
      });
      return;
    }

    const today = new Date();
    const fechaActualSinHora = new Date(today.setHours(0, 0, 0, 0));
    const fechaFiestaSinHora = new Date(new Date(fechaFiesta).setHours(0, 0, 0, 0));
    console.log(fechaActualSinHora); // Ver en consola hora actual
    console.log(fechaFiestaSinHora); // Ver en consola hora de fiesta

    if (fechaFiestaSinHora < fechaActualSinHora) {
      MySwal.fire({
        title: 'Error',
        text: 'No puedes reservar para una fiesta pasada.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-button',
        },
      });
      return;
    }

    const voucherG = generarVoucher();

    const reserva = {
      idFiesta: parseInt(idFiesta, 10),
      vaucher: voucherG,
      nombreReserva: nombre,
      apellidoReserva: apellido,
      numeroPersonas: numeroPersonas.toString(), 
      hora: hora,
      telefono: telefono,
    };

    try {
      const respuesta = await fetch('/api/reservas', {
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
      MySwal.fire({
        title: 'Reserva Exitosa',
        text: `TU VOUCHER DE RESERVA ES: ${voucherG}`,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-button',
        },
      });
      limpiarCampos();
      setAforo(prevTotal => prevTotal + parseInt(numeroPersonas, 10));
      setReservas(prevReservas => Array.isArray(prevReservas) ? [...prevReservas, reserva] : [reserva]);
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: 'Error al realizar la reserva: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-button',
        },
      });
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <h2>RESERVAR</h2>
        <p style={{fontWeight: 'bold'}}>Recuarda tomar foto de tu voucher. ¡Tendras que presentarlo a la entrada!</p>
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
