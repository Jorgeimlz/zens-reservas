import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css';
import Layout from './Layout';

const MainPage = () => {
  return (
    <div className="main-page">
      <video autoPlay loop muted playsInline className='background-video'>
        <source src="/zenspro.mp4" type="video/mp4" />
      </video>
      <Layout transparentFooter>
        <div className="feel-the-sense">
          <h2>SLOGAN EMPRESA</h2>
          <Link to="/reservar">
            <button className="reservar-button">Reservar</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default MainPage;
