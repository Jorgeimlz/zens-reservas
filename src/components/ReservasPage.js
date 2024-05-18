// src/components/ReservasPage.js
import React from 'react';
import Layout from './Layout';
import './styles/ReservasPage.css';

const ReservasPage = () => (
  <Layout>
    <div className="reservas-page">
      <div className="flyers-container">
        <div className="flyer">
          <div className="flyer-date">
            <span className="day">THU</span>
            <span className="date">16</span>
          </div>
          <div className="flyer-info">
            <h3>Znights</h3>
            <p>Are better with friends</p>
            <p>Free shots when the bell rings</p>
          </div>
        </div>
        <div className="flyer">
          <div className="flyer-date">
            <span className="day">FRI</span>
            <span className="date">17</span>
          </div>
          <div className="flyer-info">
            <h3>Cumbayá Grand Prix</h3>
            <p>End of semester oficial USFQ party</p>
            <p>USFQ no cover till 21:30</p>
          </div>
        </div>
        <div className="flyer">
          <div className="flyer-date">
            <span className="day">SAT</span>
            <span className="date">18</span>
          </div>
          <div className="flyer-info">
            <h3>Future nostalgia sunset</h3>
            <p>80's vibes</p>
            <p>Cover Free: Only guest List</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default ReservasPage;
