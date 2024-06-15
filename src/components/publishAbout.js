import React, { useState } from "react";
import './styles/publishAbout.css';

const PublishAbout = () => {
    const [description, setDescription] = useState('');

    const handleTextareaChange = (event) => {
        setDescription(event.target.value);
    }

    const handlePublish = async () => {
        const url = '/api/about';
        const data = {
            body: description
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
                setDescription(''); // Vacía el textarea
            } else {
                alert('Error al publicar');
            }
        } catch (error) {
            alert('Error al publicar: ' + error.message);
        }
    }

    return(
        <div className="aboutPage">
            <h1>PUBLICAR EN ABOUT PAGE </h1>
            <label>Ingrese la descripcion de la discoteca: </label>
            <textarea 
                placeholder="Sobre Nosotros..."
                value={description}
                onChange={handleTextareaChange}
            ></textarea>
            <button className="reservar-button" onClick={handlePublish}>Publicar</button>
        </div>
    );
}

export default PublishAbout;
