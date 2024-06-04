import React, {useState } from "react";
import './styles/publishContact.css';
const PublishContact = () => {

    const [Contact, setContact] = useState('');
    const [Numero, setNumero] = useState('');
    const [Correo, setCorreo ]= useState('');
    
    const contactAPI = async ()=>{
        const url = '/api/contact';
        const data = {
            idContact: 0,
            numero: Numero,
            correo: Correo
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
            } else {
                alert('Error al publicar');
            }
        } catch (error) {
            console.log("error con la api" + error)
        }
    }
    return(
        <div className="publishContactP">
            <h1>PUBLICAR INFO CONTACTO </h1>
            <label>Ingrese numero de contacto:</label>
            <input type="text" placeholder="Numero de contacto" onChange={(e) => setNumero(e.target.value)}></input>
            <label>Ingrese su correo de contacto:</label>
            <input type="text" placeholder="Correo de contacto" onChange={(e) => setCorreo(e.target.value)}></input>
            <button className="reservar-button" onClick={contactAPI}>Publicar</button>
        </div>

    );
}

export default PublishContact;