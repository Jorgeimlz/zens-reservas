// src/components/Layout.js
import React from 'react';
import './styles/Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <nav className="navbar-invisible">
      <div className="logo-container">
        <a href="/">
          <img src="/zens.png" alt="Zens Logo" className="navbar-logo" />
        </a>
      </div>
      <div className="links-container">
        <ul className="navbar-links">
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="/policies">Políticas</a></li>
          <li><a href="/gallery">Galería</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
    </nav>
    <div className="content">
      {children}
    </div>
    <footer className="footer">
      <p>Contacto: info@auroraclub.com</p>
      <p>Síguenos en nuestras redes sociales para más información.</p>
      <div className="logo-container">
        <div className='socialNet'>
          <img src="/igLogo.png" alt="instagram logo" className="footer-logo" />
          <p>@zenscumbaya</p>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout;
