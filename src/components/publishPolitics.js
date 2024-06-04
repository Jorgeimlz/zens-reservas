import React, { useState } from "react";
import './styles/publishPolitics.css';

const PublishPolitics = () => {
    const [politica, setPolitica] = useState('');

    const handleTextareaChange = (event) => {
        setPolitica(event.target.value);
    }

    const handlePublish = async () => {
        const url = '/api/politicas';
        const data = {
            idPolitica: 0,
            politica: politica // Corregido el nombre de la variable
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
                setPolitica(''); // Vacía el textarea
            } else {
                alert('Error al publicar');
            }
        } catch (error) {
            alert('Error al publicar: ' + error.message);
        }
    }

    return (
        <div className="postPoliPage">
            <h1>PUBLICAR POLÍTICAS</h1>
            <label>Ingrese una nueva política:</label>
            <textarea
                type="text"
                placeholder="Nueva política"
                value={politica}
                onChange={handleTextareaChange} // Agregado el evento onChange
            ></textarea>
            <button className="reservar-button" onClick={handlePublish}>Publicar</button>
        </div>
    );

}

export default PublishPolitics;
