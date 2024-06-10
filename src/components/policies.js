import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './styles/policies.css';

const Policies = () => {
  const [politicas, setPoliticas] = useState([]);
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

  return (
    <div className='poliPage'> 
    <Layout>    
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
      </Layout>
    </div>
  );
}

export default Policies;
