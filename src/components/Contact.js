import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Contact.css';
import Layout from './Layout';

const Contact = () => {
  const [Contacto, setContacto] = useState([]);

  const contactAPI = async () => {
    const url = 'api/contact';
    try {
      const resultado = await fetch(url);
      const respuesta = await resultado.json();
      const ultimo = respuesta.slice(-1);
      setContacto(ultimo);
    } catch (error) {
      console.log("Error con la API: " + error);
    }
  }

  useEffect(() => {
    contactAPI();
  }, []);

  return (
    <Layout hideFooter={false} disappearingFooter>
      <div className="contact-page">
        <h2>Contacto</h2>
        <br />
        <div className='ubicacion'>
          <a href="https://www.google.com/maps/place/0%C2%B011'24.4%22S+78%C2%B028'58.6%22W/@-0.1901032,-78.4855079,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.1901032!4d-78.482933?hl=es&entry=ttu" target='_blank' rel="noopener noreferrer">
            <img src='./ubi.png' alt="Ubicación" />
          </a>
        </div>
        {Contacto.map(contact => (
          <div key={contact.idContact}>
            <p>{contact.correo}</p>
            <p><img src='./ecFlag.png' alt="Ecuador Flag" /> {contact.numero}</p>
          </div>
        ))}
        <div className="support-info">
          <h4>Soporte</h4>
          <p>Developed by Aurora.SAS &clubs;</p>
          <div className='dosColumnas'>
            <p>soporte@aurora.com</p>
            <p>+593 999567465</p>
          </div>
        </div>
        <div className='admin-link'>
          <Link to="/LoginAdmin">Staff</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
