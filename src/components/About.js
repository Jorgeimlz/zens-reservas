import React, { useState, useEffect } from 'react';
import './styles/About.css';
import Layout from './Layout';

const About = () => {
  const [about, setAbout] = useState([]);
  const [error, setError] = useState(null);

  const fetchAboutData = async () => {
    const url = '/api/about'; // URL relativa
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const ultima = result.slice(-1);
      setAbout(ultima);
    } catch (error) {
      console.error('Error fetching the about data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <Layout>
      <div className="about-page">
        <h2>Sobre Nosotros</h2>
        <div className="about-content">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            about.map((item) => (
              <p key={item.Id}>{item.body}</p> // Usar Id en lugar de id
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default About;
