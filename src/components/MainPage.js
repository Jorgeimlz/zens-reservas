import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css';
import Layout from './Layout';

const MainPage = () => {
  return (
    <div className="main-page">
      <video autoPlay loop muted className='background-video'>
        <source src="/zenspro.mp4" type="video/mp4" />
      </video>
      <Layout>
        <div className="feel-the-sense">
          <h2>SLOGAN EMPRESA</h2>
          <Link to="/reservar">
            <button className="reservar-button">Reservar</button>
          </Link>
        </div>
      </Layout>
      <div className='admin-link'>
        <Link to="/LoginAdmin">Staff</Link>
      </div>
    </div>
  );
};

export default MainPage;
