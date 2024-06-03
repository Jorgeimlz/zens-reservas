import React, { useState, useEffect } from "react";
import './styles/verReservas.css';
import * as XLSX from 'sheetjs-style';
import { saveAs } from 'file-saver';

const VerReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [fiestas, setFiestas] = useState([]);
  const [mostrarReservas, setMostrarReservas] = useState(false);

  useEffect(() => {
    const apiFiestas = async () => {
      try {
        const urlF = '/api/Fiestas';
        const respuesta = await fetch(urlF);
        if (!respuesta.ok) {
          throw new Error('Network response was not ok');
        }
        const resultado = await respuesta.json();
        // Seleccionar solo las últimas tres fiestas
        const ultimasTres = resultado.slice(-3);
        setFiestas(ultimasTres);
      } catch (error) {
        console.error('Error fetching fiestas data:', error);
      }
    };

    apiFiestas();
  }, []); // Ejecutar solo una vez al montar el componente

  const consultaAPI = async () => {
    try {
      const url = '/api/Reservas'; // URL relativa
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error('Network response was not ok');
      }
      const resultado = await respuesta.json();
      setReservas(resultado);
      setMostrarReservas(true); // Mostrar reservas después de obtener los datos
    } catch (error) {
      console.error('Error fetching reservas data:', error);
    }
  };

  const handleButtonClick = () => {
    consultaAPI();
  };

  const clasificarReservas = (reservas, idFiesta) => {
    return reservas.filter(reserva => reserva.idFiesta === idFiesta);
  };

  const exportToExcel = (reservas, nombreFiesta) => {
    const wb = XLSX.utils.book_new();
    const wsData = reservas.map(reserva => ({
      Hora: reserva.hora,
      Nombre: `${reserva.nombreReserva} ${reserva.apellidoReserva}`,
      'Número de Personas': reserva.numeroPersonas,
      Teléfono: reserva.telefono,
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, nombreFiesta);
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xFF;
    }
    saveAs(new Blob([buf], { type: "application/octet-stream" }), `Reservas_${nombreFiesta}.xlsx`);
  };

  return (
    <div className="background">
      <div className="mainPage">
        <h1>Reservas</h1>
        <button className="reservar-button" onClick={handleButtonClick}>Ver Reservas</button>
        {mostrarReservas && fiestas.length > 0 && (
          <div className="columnas">
            {fiestas.map((fiesta, index) => {
              const reservasFiesta = clasificarReservas(reservas, fiesta.idFiesta);
              return (
                <div className={`columna columna${index + 1}`} key={fiesta.idFiesta}>
                  <h3>{fiesta.nombreFiesta}</h3>
                  {reservasFiesta.map((reserva) => (
                    <ul key={reserva.idReserva}>
                      <h4>{reserva.hora} - {reserva.nombreReserva} {reserva.apellidoReserva}</h4>
                      <li>Número de Personas: {reserva.numeroPersonas}</li>
                      <li>Teléfono: {reserva.telefono}</li>
                    </ul>
                  ))}
                  <button className="reservar-button" onClick={() => exportToExcel(reservasFiesta, fiesta.nombreFiesta)}>Exportar</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerReservas;
