import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { Icon } from '../../components/Icons';
import { Header } from '../../components/Header';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { Footer } from '../../components/Footer';
import styles from './styles.module.css';

export const ServiceListPage = () => {
  const { serviceName } = useParams<{ serviceName: string }>();
  const navigate = useNavigate();
  
  const service = services.find(service => service.key === serviceName);

  if (!service) {
    return (
      <div style={{ padding: '20px' }}>
        <Link to="/">
          <Icon name="flecha-derecha" />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100dvh - 160px)' }}>
            <h2>Servicio no encontrado</h2>
            <p>El servicio que buscas no existe.</p>
        </div>
      </div>
    );
  }

  const serviceItems = service.items?.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    onClick: () => navigate(`/services/${serviceName}/${item.id}`)
  })) || [];

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div style={{ paddingBottom: 35 }} />
        <h1 style={{ marginBottom: '20px', color: '#333' }}>
          {service.title}
        </h1>
        
        {serviceItems.length > 0 ? (
          <div style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {serviceItems.map((item) => (
              <div 
                key={item.id}
                onClick={item.onClick}
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ marginBottom: '12px', color: '#333', fontSize: '1.25rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {service.items?.find(i => i.id === item.id)?.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
              Información detallada próximamente para {service.title}
            </p>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton 
        message={`Hola, me interesa conocer más sobre el servicio: ${service.title}`}
      />
    </div>
  );
}
