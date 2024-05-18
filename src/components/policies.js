// src/components/Policies.js
import React from 'react';
import Layout from './Layout';
import './styles/policies.css';

const Policies = () => (
  <Layout>
    <div className="body">
      <div className="policies">
        <div className="title">
          <h2>POLÍTICAS</h2>
        </div>
        <div className="normas">
          <ul>
            <li>Prohibido el ingreso de personas menores de 18 años.</li>
            <li>Nos reservamos el derecho de admisión.</li>
            <li>Prohibido consumir dentro del establecimiento cualquier sustancia sujeta a fiscalización.</li>
            <li>Es obligatorio presentar documento físico de identidad para el ingreso al club.</li>
            <li>Las peleas y conductas violentas a cualquier persona dentro del club dan lugar a expulsión inmediata.</li>
            <li>Las conductas de acoso, abuso o agresión sexual dan lugar a expulsión inmediata.</li>
          </ul>
        </div>
      </div>
    </div>
  </Layout>
);

export default Policies;

