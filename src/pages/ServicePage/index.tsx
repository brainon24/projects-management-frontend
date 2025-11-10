import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { services, servicesDetails, TextContent, ListItem, SublistItem } from '../../data/services';
import { Icon } from '../../components/Icons';
import { Header } from '../../components/Header';
import styles from './styles.module.css'
import { CSS_VARS } from '../../theme/colors';

export const ServicePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const service = services.find(service => service.key === id);
  const serviceDetail = servicesDetails[id as keyof typeof servicesDetails];

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
        
        <div style={{ 
            width: '100%', 
            height: '300px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0',
            color: '#999'
        }}>
            Imagen del servicio próximamente
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
                                    return;
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
    </div>
  );
}
