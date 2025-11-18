import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { services, servicesDetails, TextContent, ListItem, SublistItem, ServiceCard } from '../../data/services';
import { Icon } from '../../components/Icons';
import { Header } from '../../components/Header';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { ImageSlider, SlideImage } from '../../components/ImageSlider';
import { Footer } from '../../components/Footer';
import { Grid } from '../../components/Grid';
import styles from './styles.module.css'
import { CSS_VARS } from '../../theme/colors';

export const ServicePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const service = services.find(service => service.key === id);
  const serviceDetail = servicesDetails[id as keyof typeof servicesDetails];

  const getDesktopImages = (): SlideImage[] => {
    if (serviceDetail?.bannerImages?.desktop) {
      return serviceDetail.bannerImages.desktop;
    }
    return [];
  };

  const getMobileImages = (): SlideImage[] => {
    if (serviceDetail?.bannerImages?.mobile) {
      return serviceDetail.bannerImages.mobile;
    }
    return [];
  };

  const desktopImages = getDesktopImages();
  const mobileImages = getMobileImages();

  if (!service?.key) {
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

  const renderTextContent = (content: TextContent[]) => {
    return content.map((item, idx) => (
      <span key={idx} style={{ fontWeight: item.bold ? 'bold' : 'normal' }}>
        {item.text}
      </span>
    ));
  };

  const renderList = (list: ListItem[]) => {
    return (
      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
        {list.map((item, idx) => {
          const sublistItem = item.find((obj): obj is SublistItem => 'sublist' in obj);
          const textItems = item.filter((obj): obj is TextContent => 'text' in obj);
          
          return (
            <li key={idx} style={{ marginBottom: '8px' }}>
              {renderTextContent(textItems)}
              {sublistItem?.sublist && (
                <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                  {sublistItem.sublist.map((subItem: TextContent[], subIdx: number) => (
                    <li key={subIdx} style={{ marginBottom: '4px' }}>
                      {renderTextContent(subItem)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderCards = (cards: ServiceCard[]) => {
    return (
      <div className={styles.cardsContainer}>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <div key={card.id} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTextContainer}>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  {card.subtitle && <p className={styles.cardSubtitle}>{card.subtitle}</p>}
                </div>
                {card.icon && (
                  <div 
                    className={styles.cardIcon}
                    style={{ backgroundColor: card.backgroundColor || 'var(--orange-lighter)' }}
                  >
                    <Icon name={card.icon} />
                  </div>
                )}
              </div>
              {card.description && (
                <div className={styles.cardDescription}>
                  {renderTextContent(card.description)}
                </div>
              )}
              {card.list && (
                <div className={styles.cardList}>
                  {renderList(card.list)}
                </div>
              )}
              {card.signature && (
                <p className={styles.cardSignature}>
                  {card.signature}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div style={{ paddingBottom: 35 }} />
        <h1 
            style={{ 
                marginBottom: '20px', 
                color: '#333' 
            }}>
            {service.title}
        </h1>

        <div style={{ margin: '20px 0' }}>
          <ImageSlider 
            images={desktopImages}
            autoplayDelay={90000}
            showDesktopOnly={true}
            className={styles.serviceSlider}
          />

          <ImageSlider 
            images={mobileImages}
            autoplayDelay={90000}
            showMobileOnly={true}
            className={styles.serviceSlider}
          />
        </div>

        {serviceDetail && (
            <div style={{ marginTop: '40px' }}>
            {serviceDetail.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} style={{ marginBottom: '40px' }}>
                
                {section.title && (
                    <h2 style={{ 
                        marginBottom: '16px', 
                        color: '#333',
                        borderBottom: `2px solid ${CSS_VARS.ORANGE_LIGHT}`,
                        paddingBottom: '8px'
                    }}>
                        {section.title}
                    </h2>
                )}

                {section.subtitle && (
                    <h3 style={{ 
                    marginBottom: '12px', 
                    color: '#555',
                    fontWeight: '600'
                    }}>
                    {section.subtitle}
                    </h3>
                )}

                {section.content && (
                    <p style={{ 
                    lineHeight: '1.6', 
                    marginBottom: '16px',
                    color: '#666'
                    }}>
                    {renderTextContent(section.content)}
                    </p>
                )}

                {section.cards && renderCards(section.cards)}

                {section.list && renderList(section.list)}

                {section.additionalContent && (
                    <p style={{ 
                    lineHeight: '1.6', 
                    marginBottom: '16px',
                    color: '#666'
                    }}>
                    {renderTextContent(section.additionalContent)}
                    </p>
                )}

                {section.additionalList && renderList(section.additionalList)}

                {section.conditions && (
                    <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '16px', 
                    borderRadius: '8px',
                    marginTop: '16px'
                    }}>
                    <h4 style={{ marginBottom: '12px', color: '#495057' }}>Condiciones:</h4>
                    {renderList(section.conditions)}
                    </div>
                )}

                {section.signature && (
                    <p style={{ 
                    fontStyle: 'italic', 
                    textAlign: 'right',
                    marginTop: '16px',
                    color: '#6c757d'
                    }}>
                    {section.signature}
                    </p>
                )}

                {section.links && (
                    <div style={{ marginTop: '20px' }}>
                    {section.links.map((link, linkIdx) => (
                        <button
                            key={linkIdx}
                            style={{
                                backgroundColor: link.type === 'google-forms' ? CSS_VARS.ORANGE : CSS_VARS.GREEN,
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                marginRight: '12px',
                                fontWeight: '600',
                                fontSize: '1rem',
                            }}
                            onClick={() => {
                                if (link.type === 'google-forms') {
                                    return window.open(link.to, '_blank');
                                }
                                if (link.type === 'contact') {
                                    return;
                                }
                                console.log(`Clicked ${link.type}: ${link.text}`);
                            }}
                        >
                        {link.text}
                        </button>
                    ))}
                    </div>
                )}

                </div>
            ))}
            </div>
        )}

        {!serviceDetail && (
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
