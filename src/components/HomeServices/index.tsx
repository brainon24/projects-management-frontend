import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../../data/services';
import styles from './styles.module.css';

export const HomeServices = () => {
  const navigate = useNavigate();
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleServiceClick = (serviceKey: string) => {
    navigate(`/service/${serviceKey}`);
  };

  const handleImageLoad = (serviceKey: string) => {
    // Simular delay para testing (remover en producción)
    setTimeout(() => {
      setLoadingImages(prev => ({ ...prev, [serviceKey]: false }));
    }, 1500); // 1.5 segundos de delay
  };

  const handleImageLoadStart = (serviceKey: string) => {
    setLoadingImages(prev => ({ ...prev, [serviceKey]: true }));
  };

  return (
    <div className={styles.servicesGrid}>
      {services.map((service) => (
        <div 
          key={service.key} 
          className={styles.serviceCard}
          onClick={() => handleServiceClick(service.key)}
        >
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          {service.image ? (
            <div className={styles.imageContainer}>
              {loadingImages[service.key] && (
                <div className={styles.imageLoadingPlaceholder} />
              )}
              <img 
                src={service.image} 
                alt={service.title} 
                className={styles.serviceImage}
                data-loading={loadingImages[service.key] || false}
                onLoadStart={() => handleImageLoadStart(service.key)}
                onLoad={() => handleImageLoad(service.key)}
                onError={() => handleImageLoad(service.key)}
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              Imagen próximamente
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
