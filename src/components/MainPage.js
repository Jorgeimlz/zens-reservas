import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css';

const MainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Cierra el menú cuando se hace clic fuera de él
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && !document.querySelector('.navbar-invisible').contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  return (
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
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`bar1 ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar2 ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar3 ${menuOpen ? 'change' : ''}`}></div>
        </div>
        <div className={`links-container ${menuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/policies" onClick={() => setMenuOpen(false)}>Políticas</Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setMenuOpen(false)}>Galería</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
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

      {/* Ubicar el enlace Staff en la esquina inferior derecha */}
      <div className='admin-link'>
        <Link to="/LoginAdmin">Staff</Link>
      </div>
    </div>
  );
};

export default MainPage;

