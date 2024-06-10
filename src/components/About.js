import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';

const About = () => {
  const [about, setAbout] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchAboutData = async () => {
    const url = '/api/about'; 
    try {
      const response = await fetch(url);
      const result = await response.json();
      const ultima = result.slice(-1);
      setAbout(ultima);
    } catch (error) {
      console.error('Error fetching the about data:', error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

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
    <div className="about-page">
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

      <h2>Sobre Nosotros</h2>
      <div className="about-content">
        {about.map((item) => (
          <p key={item.id}>{item.body}</p>
        ))}
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
};

export default About;
