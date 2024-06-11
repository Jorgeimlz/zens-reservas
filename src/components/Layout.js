import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Layout.css';

const Layout = ({ children, hideFooter, transparentFooter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className="layout">
      <nav className={`navbar-invisible ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/logoTemplate.png" alt="Zens Logo" className="navbar-logo" />
          </Link>
          <button className="burger-menu" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`links-container ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</Link></li>
            <li><Link to="/policies" onClick={() => setIsMenuOpen(false)}>Políticas</Link></li>
            <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Galería</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contacto</Link></li>
          </ul>
        </div>
      </nav>
      <div className={`content ${isScrollingDown ? 'scrolling-down' : 'scrolling-up'}`}>
        {children}
      </div>
      {!hideFooter && (
        <footer className={`footer ${transparentFooter ? 'transparent-footer' : ''} ${isScrollingDown ? 'scrolling-down' : 'scrolling-up'}`}>
          <p>Contacto: info@auroraclub.com</p>
          <p>Síguenos en nuestras redes sociales para más información.</p>
          <div className="socialNet">
            <img src="/igLogo.png" alt="instagram logo" className="footer-logo" />
            <p>@usuarioIG</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
