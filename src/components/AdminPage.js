// AdminPage.js
import React from "react";
import './styles/AdminPage.css';
import { irReserva } from "./actions/redirigirReservas";
import { useHistory } from 'react-router-dom';

const AdminPage = () => {
    const history = useHistory();
    const handleReserva = () => {
        irReserva(history);
    };
    return(<div className="adminPage"> 
        <h1>Bienvenido Administrador</h1>
        <div className="links">
                    <button className="reserbutton" onClick={handleReserva}>Ver reservas</button>
                    <button className="reserbutton" >Publicar fiestas</button>
        </div>       
    </div>);
    
}

export default AdminPage;
