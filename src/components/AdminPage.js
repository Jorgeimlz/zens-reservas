// AdminPage.js
import React from "react";
import './styles/AdminPage.css';
import { irReserva } from "./actions/redirigirReservas";
import { irPublishParty } from "./actions/redirigirFiesta";
import { useHistory } from 'react-router-dom';
import { irPublishGalery } from "./actions/redirigirFiesta";

const AdminPage = () => {
    const history = useHistory();
    const handleReserva = () => {
        irReserva(history);
    };
    const handlePfiesta = () =>{
        irPublishParty(history);
    }
    const handleGalery = () =>{
        irPublishGalery(history);
    }
    return(<div className="adminPage"> 
        <h1>Bienvenido Administrador</h1>
        <div className="links">
                    <button className="reserbutton" onClick={handleReserva}>Ver reservas</button>
                    <button className="reserbutton" onClick={handlePfiesta}>Publicar fiestas</button>
                    <button className="reserbutton" onClick={handleGalery} >Publicar en galeria</button>
        </div>       
    </div>);
    
}

export default AdminPage;
