import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './styles/ReservasPage.css';

const ReservasPage = () => {
  const [ultimasTresFiestas, setUltimasTresFiestas] = useState([]);

  useEffect(() => {
    const consultaApi = async () => {
      try {
        const url = '/api/Fiestas'; // URL relativa
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error('Network response was not ok');
        }
        const resultado = await respuesta.json();
        // Seleccionar solo las últimas tres fiestas
        const ultimasTres = resultado.slice(-3);
        setUltimasTresFiestas(ultimasTres); // Almacenar las últimas tres fiestas en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    consultaApi();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <Layout>
      <div className="reservas-page">
        <div className="flyers-container">
          {ultimasTresFiestas.map((fiesta) => (
            <a href="/login" className="no-style-link" key={fiesta.idFiesta}>
              <div className="flyer">
                <div className="flyer-date">
                  <span className="day">{fiesta.dia}</span>
                  <span className="date">{fiesta.fecha}</span>
                </div>
                <div className="flyer-info">
                  <h3>{fiesta.nombreFiesta}</h3>
                  <p>{fiesta.descripcion}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReservasPage;
