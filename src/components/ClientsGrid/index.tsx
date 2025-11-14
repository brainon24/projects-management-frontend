import styles from './styles.module.css';

import alcaldia from '../../assets/logos/helpers/alcaldia.png'
import fondoEmprender from '../../assets/logos/helpers/fondo-emprender.png'
import innpulsa from '../../assets/logos/helpers/innpulsa.png'
import transformacionDigital from '../../assets/logos/helpers/transformacion-digital.png'

export const ClientsGrid = () => {
  const clientLogos = [
    { src: alcaldia, alt: "Alcaldía", name: "Alcaldía" },
    { src: fondoEmprender, alt: "Fondo Emprender", name: "Fondo Emprender" },
    { src: innpulsa, alt: "Innpulsa", name: "Innpulsa" },
    { src: transformacionDigital, alt: "Transformación Digital", name: "Transformación Digital" },
  ];

  return (
    <div className={styles.clientsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Nuestros Clientes</h2>
        <p className={styles.sectionSubtitle}>
          Empresas que han confiado en nosotros para impulsar su crecimiento
        </p>
        <div className={styles.clientsGrid}>
          {clientLogos.map((client, index) => (
            <div key={index} className={styles.clientCard}>
              <div className={styles.clientLogo}>
                <img 
                  src={client.src} 
                  alt={client.alt}
                  className={styles.clientImage}
                />
              </div>
              <h3 className={styles.clientName}>{client.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};