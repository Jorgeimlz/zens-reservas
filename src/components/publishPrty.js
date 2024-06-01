import React, { useState } from "react";
import './styles/publishParty.css';

const PublishParty = () => {
    const [nombreFiesta, setNombreFiesta] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [numeroDia, setNumeroDia] = useState("");
    const [dia, setDia] = useState("THU");

    const handleSubmit = async () => {
        const url = '/api/Fiestas';
        const fiestaData = {
            idFiesta: 0,
            dia: numeroDia, // Número del día del input
            fecha: dia, // Día del select
            nombreFiesta: nombreFiesta, // Nombre de la fiesta del input
            descripcion: descripcion // Descripción de la fiesta del input
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fiestaData)
            });
            
            if (response.ok) {
                // Manejo de la respuesta exitosa
                alert('Fiesta publicada exitosamente');
            } else {
                // Manejo de errores
                alert('Error al publicar la fiesta');
            }
        } catch (error) {
            alert('Error de red al intentar publicar la fiesta:', error);
        }
    };

    return (
        <div className="centralPg">
            <div className="titulo">
                <h1>Publicar nuevas fiestas</h1>
            </div>
            
            <div className="form">  
                <label>Ingrese el nombre de la fiesta:</label>
                <input 
                    type="text" 
                    placeholder="Nombre de la fiesta" 
                    value={nombreFiesta} 
                    onChange={(e) => setNombreFiesta(e.target.value)} 
                />
                <label>Ingrese la descripción de la fiesta:</label>
                <input 
                    type="text" 
                    placeholder="Descripción" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                />
                <label>Seleccione las iniciales del día:</label>
                <select 
                    value={dia} 
                    onChange={(e) => setDia(e.target.value)}>
                    <option value="THU">THU</option>
                    <option value="FRY">FRY</option>
                    <option value="SAT">SAT</option>
                </select>
                <label>Ingrese el número del día:</label>
                <input 
                    type="text" 
                    placeholder="Número del día" 
                    value={numeroDia} 
                    onChange={(e) => setNumeroDia(e.target.value)} 
                />
                <button className="reservar-button" onClick={handleSubmit}>Publicar</button>
            </div>
        </div>
    );
};

export default PublishParty;
