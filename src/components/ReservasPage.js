import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './styles/ReservasPage.css';

const ReservasPage = () => {
  const [ultimasTresFiestas, setUltimasTresFiestas] = useState([]);
  const [sinFiestas, setSinFiestas] = useState(false);
  useEffect(() => {
    const consultaApi = async () => {
      try {
        const url = '/api/Fiestas';
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error('Network response was not ok');
        }
        const resultado = await respuesta.json();
        const ultimasTres = resultado.slice(-3);
        setUltimasTresFiestas(ultimasTres);
        setSinFiestas(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSinFiestas(true);
      }
    };

    consultaApi();
  }, []);

  return (
    <div className="reservas-page">
      <Layout>
      {sinFiestas ? (
        <p>No hay fiestas disponibles por el momento, intentalo más tarde &#128513;</p>
      ) : (
        <div className="flyers-container">
          {ultimasTresFiestas.map((fiesta) => (
            <Link to={`/login/${fiesta.idFiesta}`} className="no-style-link" key={fiesta.idFiesta}>
              <div className="flyer">
                <div className="flyer-date">
                  <span className="date">{fiesta.numerodia}</span>
                  <span className="day">{fiesta.dia}</span>
                </div>
                <div className="flyer-info">
                  <h3>{fiesta.nombreFiesta}</h3>
                  <p>{fiesta.descripcion}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </Layout>
    </div>
  );
};

export default ReservasPage;

