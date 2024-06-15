import React, { useState } from "react";
import './styles/publishContact.css';

const PublishContact = () => {
    const [numero, setNumero] = useState('');
    const [correo, setCorreo] = useState('');

    const contactAPI = async () => {
        const url = '/api/contact';
        const data = {
            numero: numero,
            correo: correo
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Publicado con éxito');
                // Limpiar los campos después de publicar con éxito
                setNumero('');
                setCorreo('');
            } else {
                alert('Error al publicar');
            }
        } catch (error) {
            console.error("Error con la API", error);
            alert('Error al publicar');
        }
    };

    return (
        <div className="publishContactP">
            <h1>PUBLICAR INFO CONTACTO </h1>
            <label>Ingrese numero de contacto:</label>
            <input 
                type="text" 
                placeholder="Numero de contacto" 
                value={numero} 
                onChange={(e) => setNumero(e.target.value)} 
            />
            <label>Ingrese su correo de contacto:</label>
            <input 
                type="text" 
                placeholder="Correo de contacto" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
            />
            <button className="reservar-button" onClick={contactAPI}>Publicar</button>
        </div>
    );
};

export default PublishContact;
