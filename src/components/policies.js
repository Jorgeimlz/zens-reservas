import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './styles/policies.css';

const Policies = () => {
  const [politicas, setPoliticas] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la apertura del menú

  const fetchPoliticasData = async () => {
    const url = '/api/politicas'; 
    try {
      const response = await fetch(url);
      const result = await response.json();
      setPoliticas(result);
    } catch (error) {
      console.error('Error fetching the policies data:', error);
    }
  };

  useEffect(() => {
    fetchPoliticasData();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='poliPage'>
      <nav className={`navbar-invisible ${menuOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img src="/logoTemplate.png" alt="Zens Logo" className="navbar-logo" />
          </a>
        </div>
        <div className="links-container">
          {/* Mostrar/ocultar el botón de menú hamburguesa */}
          <div className="burger-menu" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {/* Mostrar/ocultar enlaces de navegación */}
          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="/policies">Políticas</a></li>
            <li><a href="/gallery">Galería</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>
      </nav>
      
      <div className="body">
        <div className="policies">
          <div className="title">
            <h2>POLÍTICAS</h2>
          </div>
          <div className="normas">
            <ul>
              {politicas.map(politica => (
                <li key={politica.idPolitica}>{politica.politica}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Contacto: info@auroraclub.com</p>
        <p>Síguenos en nuestras redes sociales para más información.</p>
        <div className="logo-container">
          <div className='socialNet'>
            <img src="/igLogo.png" alt="instagram logo" className="footer-logo" />
            <p>@usuarioIG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Policies;
