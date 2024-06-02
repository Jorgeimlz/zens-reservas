import React from "react";
import '../components/styles/publishGalery.css';

const PublishGalery = () => {

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

                const payload = {
                    id: 0,
                    urLimg: base64String,
                    nombreArchivo: file.name,
                    mime: file.type,
                    fechaCarga: new Date().toISOString()
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
                        console.error("Error al subir la imagen:", response.statusText);
                        alert("Error al subir la imagen");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error al subir la imagen");
                }
            };
            reader.readAsDataURL(file);
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
        </div>
    );
};

export default PublishGalery;
