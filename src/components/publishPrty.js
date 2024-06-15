import React, { useState } from "react";
import './styles/publishParty.css';

const PublishParty = () => {
    const initialState = {
        nombreFiesta: "",
        descripcion: "",
        numerodia: "",
        dia: "THU",
        date: ""
    };

    const [nombreFiesta, setNombreFiesta] = useState(initialState.nombreFiesta);
    const [descripcion, setDescripcion] = useState(initialState.descripcion);
    const [numerodia, setNumerodia] = useState(initialState.numerodia);
    const [dia, setDia] = useState(initialState.dia);
    const [date, setDate] = useState(initialState.date);

    const handleSubmit = async () => {
        const url = '/api/fiestas/';
        const fiestaData = {
            numerodia: numerodia,
            dia: dia,
            nombreFiesta: nombreFiesta,
            descripcion: descripcion,
            fecha: date
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
                alert('Fiesta publicada exitosamente');
                // Reiniciar los estados a sus valores iniciales
                setNombreFiesta(initialState.nombreFiesta);
                setDescripcion(initialState.descripcion);
                setNumerodia(initialState.numerodia);
                setDia(initialState.dia);
                setDate(initialState.date);
            } else {
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
                <label>Seleccione las iniciales del día: Formato visual</label>
                <select 
                    value={dia} 
                    onChange={(e) => setDia(e.target.value)}>
                    <option value="THU">THU</option>
                    <option value="FRY">FRY</option>
                    <option value="SAT">SAT</option>
                </select>
                <label>Ingrese el número del día: Formato visual</label>
                <input 
                    type="text" 
                    placeholder="Número del día" 
                    value={numerodia} 
                    onChange={(e) => setNumerodia(e.target.value)} 
                />
                <label>Ingrese la fecha de la fiesta</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
                <button className="reservar-button" onClick={handleSubmit}>Publicar</button>
            </div>
        </div>
    );
};

export default PublishParty;
