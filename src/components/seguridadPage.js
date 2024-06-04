import '../components/styles/seguridadPage.css';
import React, { useState } from "react";

const SeguridadPage = () => {
    const [voucher, setVoucher] = useState("");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [reservas, setReservas] = useState([]);

    const handleInputChange = (e) => {
        setVoucher(e.target.value);
    };

    const verificarReserva = async () => {
        try {
            const response = await fetch(`/api/Reservas`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json(); 
            setReservas(data);
            setError(null);

            const reservaEncontrada = reservas.find(reserva => reserva.vaucher === voucher);
            if (!reservaEncontrada) {
                throw new Error("No existe reserva con este voucher");
            }

            setResultado(reservaEncontrada);
            setError(null);

            // Eliminar la reserva
            await deleteReserva(reservaEncontrada.idReserva);
        } catch (error) {
            setResultado(null);
            setError(error.message);
        }
    };

    const deleteReserva = async (id) => {
        try {
            const response = await fetch(`/api/Reservas/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const camposMostrar = ['nombreReserva', 'apellidoReserva', 'numeroPersonas', 'hora', 'telefono'];

    return (
        <div className="pageSeguridad">
            <h1>CONTROL DE RESERVAS</h1>
            <p>Ingrese el voucher de la reserva: </p>
            <input
                type="text"
                value={voucher}
                onChange={handleInputChange}
            />
            <button className="reservar-button" onClick={verificarReserva}>
                Verificar
            </button>
            {resultado && (
                <div className="resultado">
                    <h2 style={{ color: 'green' }}>APROBADO</h2>
                    {camposMostrar.map(key => (
                        resultado[key] && (
                            <div key={key} className="resultado-item">
                                <label>{key}: </label>
                                <span>{resultado[key]}</span>
                            </div>
                        )
                    ))}
                </div>
            )}
            {error && (
                <div className='resultado'>
                    <h2 style={{ color: 'red' }}>NO EXISTE RESERVA O YA FUE USADA</h2>
                </div>
            )}
        </div>
    );
};

export default SeguridadPage;
