import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import styles from './styles.module.css';
import './styles.css';

export interface SlideImage {
  src: string;
  alt?: string;
  backgroundColor?: string;
}

interface ImageSliderProps {
  images: SlideImage[];
  autoplayDelay?: number;
  showDesktopOnly?: boolean;
  showMobileOnly?: boolean;
  className?: string;
}

export const ImageSlider = ({ 
  images, 
  autoplayDelay = 5000,
  showDesktopOnly = false,
  showMobileOnly = false,
  className = ''
}: ImageSliderProps) => {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (imageSrc: string) => {
    setLoadingImages(prev => ({ ...prev, [imageSrc]: false }));
  };

  const handleImageLoadStart = (imageSrc: string) => {
    setLoadingImages(prev => ({ ...prev, [imageSrc]: true }));
  };

  const getContainerClass = () => {
    if (showDesktopOnly) return `${styles.desktopOnly} ${className}`;
    if (showMobileOnly) return `${styles.mobileOnly} ${className}`;
    return className;
  };

  return (
    <div className={getContainerClass()}>
      <Swiper
        cssMode
        navigation
        pagination
        mousewheel
        keyboard
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="swiper-container"
        autoplay={{
          delay: autoplayDelay,
        }}
      >
        {images.map((image, idx) => (
          <SwiperSlide key={`${image.src}-${idx}`}>
            <div 
              className={styles.slideContainer} 
              style={{ backgroundColor: image.backgroundColor || '#f0f0f0' }}
            >
              {loadingImages[image.src] && (
                <div className={styles.imageLoadingPlaceholder} />
              )}
              <img 
                src={image.src} 
                alt={image.alt || `Slide ${idx + 1}`}
                loading="lazy" 
                className={styles.slideImage}
                data-loading={loadingImages[image.src] || false}
                onLoadStart={() => handleImageLoadStart(image.src)}
                onLoad={() => handleImageLoad(image.src)}
                onError={() => handleImageLoad(image.src)}
                style={{objectFit: 'contain'}} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};