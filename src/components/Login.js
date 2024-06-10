import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import Layout from './Layout';
import './styles/Login.css';
import { generarVoucher } from './actions/veriCredenciales';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    //OBTENER FECHA DE LA FIESTA
    const getFechat = async () => {
      try {
        const idF = parseInt(idFiesta, 10);
        const url = `/api/Fiestas/${idF}`;
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
    //OBTENER LAS RESERVAS EN ESA FIESTA HECHA PARA VERIFICAR AFORO
    const getReservas = async () => {
      try {
        const id = parseInt(idFiesta, 10);
        const url = await fetch(`/api/Reservas/GetAllIdFiesta/${id}`);
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
    //aforo, cambiar solo 15 x aforo limite deseado
    const limiteAforo = 20;
    if (aforo + parseInt(numeroPersonas, 10) > limiteAforo) {
      toast.error('No hay suficiente aforo disponible para esta reserva.', { position: "top-center" });
      return;
    }

    const today = new Date();
    const fechaActualSinHora = new Date(today.setHours(0, 0, 0, 0));
    const fechaFiestaSinHora = new Date(new Date(fechaFiesta).setHours(0, 0, 0, 0));
    console.log(fechaActualSinHora); // Ver en consola hora actual
    console.log(fechaFiestaSinHora); // Ver en consola hora de fiesta
    // Control de fechas
    if (fechaFiestaSinHora < fechaActualSinHora) {
      toast.error('No puedes reservar para una fiesta pasada.', { position: "top-center" });
      return;
    }

    // Generar el voucher en el momento de la reserva
    const voucherG = generarVoucher();

    const reserva = {
      idReserva: 0,
      idFiesta: parseInt(idFiesta, 10),
      vaucher: voucherG,
      nombreReserva: nombre,
      apellidoReserva: apellido,
      numeroPersonas: numeroPersonas.toString(), 
      hora: hora,
      telefono: telefono,
    };
    
    //HACER POST DE LA RESERVA
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
      limpiarCampos();
      setAforo(prevTotal => prevTotal + parseInt(numeroPersonas, 10));
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
          <p style={{fontWeight: 'bold'}}>Recuarda tomar foto de tu voucher. ¡Tendras que presentarlo a la entrada!</p>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;
