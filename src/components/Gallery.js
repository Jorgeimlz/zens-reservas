import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './styles/Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    apiGaleriaget();
  }, []);

  return (
    <Layout>
      <div className="gallery-page">
        <h2>Galería</h2>
        <p>Contenido de la galería.</p>
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.urLimg} alt={image.nombreArchivo} onError={(e) => e.target.src = 'default-image-url.jpg'} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;

