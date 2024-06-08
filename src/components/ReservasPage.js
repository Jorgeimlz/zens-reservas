import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import Layout from './Layout';
import './styles/ReservasPage.css';

const ReservasPage = () => {
  const [ultimasTresFiestas, setUltimasTresFiestas] = useState([]);
  const [sinFiestas, setSinFiestas] = useState(false);

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
        setSinFiestas(false); // Restablecer el estado de sinFiestas
      } catch (error) {
        console.error('Error fetching data:', error);
        setSinFiestas(true); // Establecer sinFiestas como true si hay un error en la consulta
      }
    };

    consultaApi();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <Layout>
      <div className="reservas-page">
        {sinFiestas ? (
          <p>No hay fiestas disponibles por el momento, intentalo más tarde &#128513; </p>
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
      </div>
    </Layout>
  );
};

export default ReservasPage;
