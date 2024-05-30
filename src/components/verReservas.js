import React, { useState } from "react";
import './styles/verReservas.css';

const VerReservas = () => {
   const [mostrarColumnas, setMostrarColumnas] = useState(false);

   const handleMostrarColumnas = () => {
      setMostrarColumnas(true);
   };

   return (
      <div className="mainPage">
        <nav className="navBack">
        </nav>
         <h1>Reservas</h1>
         <button className="reservar-button" onClick={handleMostrarColumnas}>ver reservas</button>
         { mostrarColumnas && (
            <div className="columnas">
               <div className="columna1">
                  <ul>
                     <h3> Fiesta Jueves</h3>
                     <li> ejemplo 1</li>
                  </ul>
               </div>
               <div className="columna2">
                  <ul>
                     <h3> Fiesta Viernes</h3>
                     <li>reserva 2</li>
                  </ul>
               </div>
               <div className="columna3">
                  <ul>
                     <h3> Fiesta Sabado</h3>
                     <li> reserva 1</li>
                  </ul>
               </div>
            </div>
         )}
      </div>
   );
};

export default VerReservas;
