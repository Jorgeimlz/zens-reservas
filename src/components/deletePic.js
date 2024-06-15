import React, { useEffect, useState } from 'react';
import './styles/deletePic.css';

const DeletePic = () => {
  const [images, setImages] = useState([]);
  const isMobileDevice = window.innerWidth <= 768; // Define el ancho máximo para considerar dispositivos móviles

  // Mostrar todas las fotos
  const apiGaleriaget = async () => {
    const url = '/api/galeria';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  // Eliminar foto
  const deleteFoto = async (Id) => {
    const ruta = `/api/galeria/${Id}`;
    try {
      const response = await fetch(ruta, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Elimina la imagen del estado local
      setImages(images.filter((image) => image.Id !== Id));
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  useEffect(() => {
    apiGaleriaget();
  }, []);

  // Confirmación de eliminación
  const handleDeleteClick = (Id) => {
    if (!isMobileDevice || window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      deleteFoto(Id);
    }
  };

  return (
    <div className="deletePage">
      <h2>Galería</h2>
      <p>Da click en la imagen que deseas eliminar!</p>
      <div className="deleteGrid">
        {images.map((image) => (
          <div key={image.id} className="deleteItem">
            <img
              src={`data:${image.MIME};base64,${image.URLimg}`}
              alt={image.nombreArchivo}
              onError={(e) => e.target.src = 'default-image-url.jpg'}
              onClick={() => handleDeleteClick(image.Id)}
            />
            {!isMobileDevice && (
              <button className="deleteButton" onClick={() => handleDeleteClick(image.Id)}>X</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeletePic;

