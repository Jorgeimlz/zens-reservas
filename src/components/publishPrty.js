import React from "react";
import './styles/publishParty.css'
const publishPrty = () =>{
    const consumoAPI = async () =>{
        const url = '/api/Fiestas';
    }
    return(
        <div className="centralPg">
            <div className="titulo">
                <h1>Publicar nuevas fiestas </h1>
            </div>
            
            <div className="form">  
                        <label>Ingrese el nombre de la fiesta:</label>
                        <input type="text" placeholder="Nombre de la fiesta"></input>
                        <label>Ingrese la descripcion de la fiesta</label>
                        <input type="text" placeholder="Descripcion"></input>
                        <label>Seleccione las iniciales del dia</label>
                        <select>
                            <option>THU</option>
                            <option>FRY</option>
                            <option>SAT</option>
                        </select>
                        <label>Ingrese el numero del dia</label>
                        <input type="text" placeholder="Numero del dia"></input>
                        <button className="reservar-button" >Publicar</button>
            </div>
        </div>
    );

}


export default publishPrty;