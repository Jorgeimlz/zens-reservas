import React from "react";
import '../components/styles/publishGalery.css';
import { useHistory } from 'react-router-dom';
import { irdeletePic } from "./actions/redirigirFiesta";

const PublishGalery = () => {
    const history = useHistory();

    const handleDelete = () => {
        irdeletePic(history);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

                const payload = {
                    URLimg: base64String,
                    nombreArchivo: file.name,
                    MIME: file.type,
                    fechaCarga: new Date().toISOString().split('T')[0]  // Obtener fecha en formato YYYY-MM-DD
                };

                try {
                    const response = await fetch('/api/galeria', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Imagen subida correctamente:", data);
                        alert("Imagen subida correctamente");
                    } else {
                        const errorText = await response.text(); // Obtener texto del error
                        console.error("Error al subir la imagen:", errorText);
                        alert("Error al subir la imagen: " + errorText);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error al subir la imagen: " + error.message);
                }
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            alert("Error al procesar el archivo: " + error.message);
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="prins">
            <h1>Publicar nuevas fotos</h1>
            <button className="reservar-button" onClick={handleButtonClick}>
                Añadir fotos del carrete
            </button>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            <button className="reservar-button" onClick={handleDelete}> Eliminar fotos </button>
        </div>
    );
};

export default PublishGalery;
