import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import ImageViewer from './ImageViewer'; // Importa el componente del visor de imágenes
import './styles/Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false); // Estado para rastrear si el visor de imágenes está abierto
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const apiGaleriaget = async () => {
    const url = '/api/galeria/';
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

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <Layout disappearingFooter>
      <div className="gallery-page">
        <h2>Galería</h2>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div key={image.id} className="gallery-item" onClick={() => openImageViewer(index)}>
              <img
                src={`data:${image.MIME};base64,${image.URLimg}`}
                alt={image.nombreArchivo}
                onError={(e) => e.target.src = 'default-image-url.jpg'}
              />
            </div>
          ))}
        </div>
      </div>
      {viewerOpen && (
        <ImageViewer
          images={images}
          onClose={closeImageViewer}
          currentIndex={selectedImageIndex}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </Layout>
  );
};

export default Gallery;
