import React from "react";
import { Link } from 'react-router-dom';
import './styles/AdminPage.css';
const AdminPage = () => (
    <div className="adminPage">  
        <h1>Bienvenido Administrador</h1>
        <div className="links">
        <ul>
            <li> <Link to="/">Ver Reservas</Link> </li>
            <li><Link to="/">Publicar nuevas fiestas</Link></li>
        </ul>
        </div>       
    </div>
);
export default AdminPage;
