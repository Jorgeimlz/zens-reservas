import React, { useState } from "react";
import './styles/verReservas.css';

const VerReservas = () => {
   const [reservas, setReservas] = useState([]);
   const [mostrarReservas, setMostrarReservas] = useState(false);

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
         console.error('Error fetching data:', error);
      }
   };

   const handleButtonClick = () => {
      consultaAPI();
   };

   const clasificarReservas = (reservas) => {
      const columna1 = reservas.filter(reserva => reserva.idFiesta === 1);
      const columna2 = reservas.filter(reserva => reserva.idFiesta === 2);
      const columna3 = reservas.filter(reserva => reserva.idFiesta === 3);
      return { columna1, columna2, columna3 };
   };

   const { columna1, columna2, columna3 } = clasificarReservas(reservas);

   return (
      <div className="background">
         <div className="mainPage">
            <h1>Reservas</h1>
            <button className="reservar-button" onClick={handleButtonClick}>Ver Reservas</button>
            {mostrarReservas && (
               <div className="columnas">
                  <div className="columna columna1">
                     <h3>JUEVES</h3>
                     {columna1.map((reserva) => (
                        <ul key={reserva.idReserva}>
                           <h4>{reserva.hora} - {reserva.nombreReserva} {reserva.apellidoReserva}</h4>
                           <li>Número de Personas: {reserva.numeroPersonas}</li>
                           <li>Teléfono: {reserva.telefono}</li>
                        </ul>
                     ))}
                  </div>
                  <div className="columna columna2">
                     <h3>VIERNES</h3>
                     {columna2.map((reserva) => (
                        <ul key={reserva.idReserva}>
                           <h4>{reserva.hora} - {reserva.nombreReserva} {reserva.apellidoReserva}</h4>
                           <li>Número de Personas: {reserva.numeroPersonas}</li>
                           <li>Teléfono: {reserva.telefono}</li>
                        </ul>
                     ))}
                  </div>
                  <div className="columna columna3">
                     <h3>SABADO</h3>
                     {columna3.map((reserva) => (
                        <ul key={reserva.idReserva}>
                           <h4>{reserva.hora} - {reserva.nombreReserva} {reserva.apellidoReserva}</h4>
                           <li>Número de Personas: {reserva.numeroPersonas}</li>
                           <li>Teléfono: {reserva.telefono}</li>
                        </ul>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default VerReservas;
