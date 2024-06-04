// src/components/Contact.js
import React, {useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Contact.css';

const Contact = () => {
  const [Contacto, setContacto] = useState([]);
  const contactAPI = async () =>{
      const url = 'api/contact';
      try {
        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        const ultimo = respuesta.slice(-1);
        setContacto(ultimo);
      } catch (error) {
        console.log("error la con api"+ error)
      }
      

  }
  useEffect(() => {
    contactAPI();
  }, []);

  return(
    <div className='contactMainPage'>
        <nav className="navbar-invisible">
          <div className="logo-container">
            <Link to="/">
              <img src="/logoTemplate.png" alt="Zens Logo" className="navbar-logo" />
            </Link>
          </div>
          <div className="links-container">
            <ul className="navbar-links">
              <li>
                <Link to="/about">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/policies">Políticas</Link>
              </li>
              <li>
                <Link to="/gallery">Galería</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              <li className='admin'>
                <Link to="/LoginAdmin">Soy admin</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="contact-page">
          <h2>Contacto</h2>
          <br></br>
          <div className='ubicacion'>
            <a href="https://www.google.com/maps/place/0%C2%B011'24.4%22S+78%C2%B028'58.6%22W/@-0.1901032,-78.4855079,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.1901032!4d-78.482933?hl=es&entry=ttu" target='_blank'>
              <img src='./ubi.png' ></img>
            </a>
          </div>
          {Contacto.map(contact => (
                <p key={contact.idContact}> {contact.correo} </p>
              ))}
          {Contacto.map(contact => (
                <p  key={contact.idContact}>  <img src='./ecFlag.png'/> {contact.numero}</p>
              ))}
          
          
        </div>

        <footer className="footerContact">
          <h4>Soporte</h4>
          <p>Developed by Aurora.SAS &clubs;</p>
          <div className='dosColumnas'>
          <p>soporte@aurora.com</p>
          <p>+593 999567465</p>
          </div>

        </footer>

     </div>

  );
  
}

export default Contact;
