import React, { useEffect } from 'react';
import './styles/ImageViewr.css';

const ImageViewer = ({ images, onClose, currentIndex, onPrevious, onNext }) => {
  const handlePrevious = (e) => {
    e.stopPropagation();
    onPrevious();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNext();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:${images[currentIndex].mime};base64,${images[currentIndex].urLimg}`;
    link.download = images[currentIndex].nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose, onPrevious, onNext]);

  return (
    <div className="image-viewer-overlay" onClick={onClose}>
      <div className="image-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="image-container">
          <img
            src={`data:${images[currentIndex].mime};base64,${images[currentIndex].urLimg}`}
            alt={images[currentIndex].nombreArchivo}
            style={{ maxWidth: '50vw', maxHeight: '50vh', display: 'block', margin: '0 auto' }}
          />
          <div className="download-icon" onClick={handleDownload}>
            <img
              src='/down.png'
              alt="Descargar"
              title="Descargar"
            />
          </div>
          <div className="nav-arrow nav-arrow-left" onClick={handlePrevious}>
            &lt;
          </div>
          <div className="nav-arrow nav-arrow-right" onClick={handleNext}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
