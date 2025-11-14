import { useState } from 'react';
import { Icon } from '../Icons';
import { GridSectionProps } from './interface';
import styles from './styles.module.css';

export const Grid = ({ 
  title, 
  subtitle, 
  items, 
  variant = 'services',
  className = '',
  itemClassName = '',
  backgroundColor,
  style,
  columns
}: GridSectionProps) => {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (itemId: string) => {
    setLoadingImages(prev => ({ ...prev, [itemId]: false }));
  };

  const handleImageLoadStart = (itemId: string) => {
    setLoadingImages(prev => ({ ...prev, [itemId]: true }));
  };

  const getGridClassName = () => {
    const baseClass = styles.grid;
    const variantClass = styles[`grid${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
    return `${baseClass} ${variantClass} ${className}`.trim();
  };

  const getItemClassName = () => {
    const baseClass = styles.gridItem;
    const variantClass = styles[`${variant}Item`];
    return `${baseClass} ${variantClass} ${itemClassName}`.trim();
  };

  const sectionStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(style || {}),
  };
  const gridStyle = columns ? {
    '--mobile-columns': columns.mobile || 1,
    '--tablet-columns': columns.tablet || 2,
    '--desktop-columns': columns.desktop || 3,
  } as React.CSSProperties : {};

  return (
    <div className={styles.gridSection} style={sectionStyle}>
      <div className={styles.container}>
        {title && <h1 className={styles.sectionTitle}>{title}</h1>}
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        
        <div className={getGridClassName()} style={gridStyle}>
          {items.map((item) => (
            <div 
              key={item.id}
              className={getItemClassName()}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? 'pointer' : 'default' }}
            >
              {/* Services variant */}
              {variant === 'services' && (
                <>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.image ? (
                    <div className={styles.imageContainer}>
                      {loadingImages[item.id] && (
                        <div className={styles.imageLoadingPlaceholder} />
                      )}
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className={styles.itemImage}
                        data-loading={loadingImages[item.id] || false}
                        onLoadStart={() => handleImageLoadStart(item.id)}
                        onLoad={() => handleImageLoad(item.id)}
                        onError={() => handleImageLoad(item.id)}
                      />
                    </div>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      Imagen próximamente
                    </div>
                  )}
                </>
              )}

              {/* About variant */}
              {variant === 'about' && (
                <>
                  <div className={styles.aboutHeader}>
                    <div className={styles.aboutTextContainer}>
                      <h4 className={styles.aboutTitle}>{item.title}</h4>
                      {item.subtitle && <p className={styles.aboutSubtitle}>{item.subtitle}</p>}
                    </div>
                    {item.icon && (
                      <div 
                        className={styles.aboutIcon}
                        style={{ backgroundColor: item.backgroundColor || 'var(--orange-lighter)' }}
                      >
                        <Icon name={item.icon} />
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <p className={styles.aboutDescription}>{item.description}</p>
                  )}
                </>
              )}

              {/* Clients variant */}
              {variant === 'clients' && (
                <>
                  <div className={styles.clientLogo}>
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={styles.clientImage}
                      />
                    )}
                  </div>
                  <h3 className={styles.clientName}>{item.title}</h3>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};