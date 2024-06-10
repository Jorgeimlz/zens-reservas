import React, { useState } from 'react';
import './styles/Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout">
      <nav className={`navbar-invisible ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img src="/logoTemplate.png" alt="Zens Logo" className="navbar-logo" />
          </a>
          <button className="burger-menu" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`links-container ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-links">
            <li><a href="/about" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</a></li>
            <li><a href="/policies" onClick={() => setIsMenuOpen(false)}>Políticas</a></li>
            <li><a href="/gallery" onClick={() => setIsMenuOpen(false)}>Galería</a></li>
            <li><a href="/contact" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
          </ul>
        </div>
      </nav>
      <div className="content">
        {children}
      </div>
      <footer className="footer">
        <p>Contacto: info@auroraclub.com</p>
        <p>Síguenos en nuestras redes sociales para más información.</p>
        <div className="socialNet">
          <img src="/igLogo.png" alt="instagram logo" className="footer-logo" />
          <p>@usuarioIG</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

