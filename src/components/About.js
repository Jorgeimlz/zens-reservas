import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';
import Layout from './Layout';

const About = () => {
  const [about, setAbout] = useState([]);

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
  return (
    <div className="about-page">
      <Layout>
        <h2>Sobre Nosotros</h2>
      <div className="about-content">
        {about.map((item) => (
          <p key={item.id}>{item.body}</p>
        ))}
      </div>
      </Layout>        
    </div>
  );
};

export default About;
