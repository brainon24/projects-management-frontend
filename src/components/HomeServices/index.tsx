import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import styles from './styles.module.css';

export const HomeServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceKey: string) => {
    navigate(`/service/${serviceKey}`);
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
          <div className={styles.imagePlaceholder}>
            Imagen próximamente
          </div>
        </div>
      ))}
    </div>
  )
}
