import '../components/styles/seguridadPage.css';
import React, { useState, useEffect } from "react";

const SeguridadPage = () => {
    const [voucher, setVoucher] = useState("");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [fiestas, setFiestas] = useState([]);
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        loadFiestas();
    }, []);

    const loadFiestas = async () => {
        try {
            const response = await fetch(`/api/fiestas`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setFiestas(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const verificarReserva = async () => {
        try {
            const response = await fetch(`/api/reservas`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json(); 
            setReservas(data);
            setError(null);

            const reservaEncontrada = data.find(reserva => reserva.vaucher === voucher);
            if (!reservaEncontrada) {
                throw new Error("No existe reserva con este voucher");
            }

            const fiestaEncontrada = fiestas.find(fiesta => fiesta.idFiesta === reservaEncontrada.idFiesta);
            if (!fiestaEncontrada) {
                throw new Error("No se encontró la fiesta correspondiente a la reserva");
            }

            reservaEncontrada.nombreFiesta = fiestaEncontrada.nombreFiesta; // Añadir nombre de la fiesta a la reserva encontrada

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
            const response = await fetch(`/api/reservas/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setVoucher(e.target.value);
    };

    const camposMostrar = [
        { label: 'Nombre', key: 'nombreReserva', transform: (resultado) => `${resultado.nombreReserva} ${resultado.apellidoReserva}` },
        { label: 'Hora', key: 'hora' },
        { label: 'Número Personas', key: 'numeroPersonas' },
        { label: 'Teléfono', key: 'telefono' }
    ];

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
                    {resultado.nombreFiesta && (
                        <p>{resultado.nombreFiesta} &#127881;</p>
                    )}
                    {camposMostrar.map((item, index) => (
                        resultado[item.key] && (
                            <div key={index} className="resultado-item">
                                <label>{item.label}: </label>
                                <span>{item.transform ? item.transform(resultado) : resultado[item.key]}</span>
                            </div>
                        )
                    ))}
                </div>
            )}
            {error && (
                <div className='resultado'>
                    <h2 style={{ color: 'red' }}>ERROR</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default SeguridadPage;
