import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css';

const MainPage = () => (
  <div className="main-page">
    <video autoPlay loop muted className='background-video'>
      <source src="/zenspro.mp4" type="video/mp4" />
    </video>
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

    <div className="feel-the-sense">
      <h2>SLOGAN EMPRESA</h2>
      <Link to="/reservar">
        <button className="reservar-button">Reservar</button>
      </Link>
    </div>

    <footer className="footer">
      <p>Contacto: info@auroraclub.com</p>
      <p>Síguenos en nuestras redes sociales para más información.</p>
      <div className="logo-container">
        <div className="socialNet">
          <img src="/igLogo.png" alt="instagram logo" className="footer-logo" />
          <p>@usuarioIG</p>
        </div>
      </div>
    </footer>
  </div>
);

export default MainPage;
