import { Button } from '../../components/Button';
import { Header } from '../../components/Header'
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { ImageSlider, SlideImage } from '../../components/ImageSlider';
import { Footer } from '../../components/Footer';
import { Grid } from '../../components/Grid';

import styles from './styles.module.css'
import { HowWeDoItTimeline } from '../../components/HowWeDoItTimeline';

import desktopBanner1 from '../../assets/banners/desktop-banner-1.jpg'
import desktopBanner2 from '../../assets/banners/desktop-banner-2.jpg'
import mobileBanner1 from '../../assets/banners/mobile-banner-1.jpg'
import mobileBanner2 from '../../assets/banners/mobile-banner-2.jpg'
import { HomeServices } from '../../components/HomeServices';

import frixo from '../../assets/logos/clients/Frixo.png'
import laQuerencia from '../../assets/logos/clients/La-querencia.png'
import fonos from '../../assets/logos/clients/Logo FONOS-01.png'
import garden from '../../assets/logos/clients/garden.png'
import lastices from '../../assets/logos/clients/lastices.png'
import olivos from '../../assets/logos/clients/olivos.png'
import pallay from '../../assets/logos/clients/pallay.png'
import tipika from '../../assets/logos/clients/tipika.png'
import { diagnosticFormLink } from '../../data/services';
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation';


export const HomePage = () => {

  const { handleAnchorClick } = useAnchorNavigation();

  // Desktop -> 1280px x 400px & Mobile -> 650px x 400px
  const desktopBanners: SlideImage[] = [
    {
      src: desktopBanner1,
      alt: "Banner Desktop 1",
      backgroundColor: '#e2f7f6'
    },
    {
      src: desktopBanner2,
      alt: "Banner Desktop 2", 
      backgroundColor: '#d3d2d2'
    },
  ];

  const mobileBanners: SlideImage[] = [
    {
      src: mobileBanner1,
      alt: "Banner Mobile 1",
      backgroundColor: '#e2f7f6'
    },
    {
      src: mobileBanner2,
      alt: "Banner Mobile 2",
      backgroundColor: '#d3d2d2'
    },
  ];  

  return (
    <div id='home'>
      <Header />
      <div className={styles.container}>
        <ImageSlider 
          images={desktopBanners} 
          autoplayDelay={90000}
          showDesktopOnly={true}
          className={styles.desktopBanners}
        />

        <ImageSlider 
          images={mobileBanners} 
          autoplayDelay={90000}
          showMobileOnly={true}
          className={styles.mobileBanners}
        />

        <h2 className={styles.connectionsSubtitle}>Conexiones que le dan valor a tu negocio</h2>
        <p className={styles.connectionText}>Plataforma de estrategia y ejecución en marketing para MiPymes: diagnósticos, aliados certificados y campañas que convierten visibilidad en ventas.</p>
        <div className={styles.connectionButtonsContainer}>
          <Button 
            onClick={() => window.open(diagnosticFormLink, '_blank')}
          >Solicitar diagnóstico gratuito</Button>
          <Button 
            variant='border'
            onClick={(event) => {
              handleAnchorClick(event, '/#services');
            }}
          >Ver servicios</Button>
        </div>

        <div id='about'>
          <Grid 
            title=""
            items={[
              {
                id: "quienes-somos",
                title: "¿Quiénes somos?",
                subtitle: "Plataforma de Conexiones de Marca",
                description: "Somos la Brand-Connection Platform que conecta a las MiPymes con la estrategia y una ejecución profesional que necesitan para ser visibles, relevantes y rentables.",
                icon: "rocket-02"
              },
              {
                id: "que-hacemos",
                title: "¿Qué hacemos?",
                subtitle: "Estrategia integral de comunicación",
                description: "Planeamos, conceptualizamos, diseñamos y producimos campañas ejecutables en medios on y offline con acompañamiento en la implementación.",
                icon: "line-chart-up-02",
                backgroundColor: "var(--green-light)"
              },
              {
                id: "objetivo",
                title: "¿Cuál es nuestro objetivo?",
                subtitle: "Inversión que genera resultados",
                description: "Que cada inversión en comunicación se traduzca en reconocimiento y ventas medibles para tu empresa.",
                icon: "presentation-chart-01"
              }
            ]}
            variant="about"
            className={styles.aboutContainer}
            style={{
              padding: '70px 0 0 0',
              margin: 0
            }}
          />
        </div>
      </div>

      <div className={styles.howWeDoItTimelineContainerBg}>
        <div className={styles.container} style={{ marginTop: 50 }}>
          <div className={styles.howWeDoItTimelineContainer}>
            <h3>Cómo lo hacemos</h3>
            <HowWeDoItTimeline />
          </div>
        </div>
      </div>

      <div id='services'>
        <div className={styles.container}>
          <h2 
            className={styles.sectionHead}
          >¿Que necesitas para darle valor a tu negocio?</h2>
          <HomeServices />
        </div>
      </div>

      <div className={styles.impactBannerContainer}>
        <div className={styles.container}>
          <div className={styles.impactBanner}>
            <p className={styles.impactBannerTitle}>
              ¿Qué tanto está impactando la comunicación del negocio, su visibilidad y sus ventas?
            </p>
            <Button 
              style={{
              fontSize: '0.85rem',
              }}
              onClick={() => window.open(diagnosticFormLink, '_blank')}>Diagnóstico Gratuito</Button>
          </div>
        </div>
      </div>

      <Grid
        title="Experiencias"
        subtitle="Empresas que han confiado en nosotros para darle valor a sus negocios"
        items={[
          {
            id: "frixo",
            title: "Frixo",
            image: frixo
          },
          {
            id: "la-querencia",
            title: "La Querencia",
            image: laQuerencia
          },
          {
            id: "fonos",
            title: "FONOS",
            image: fonos
          },
          {
            id: "garden",
            title: "Garden Freesia",
            image: garden
          },
          {
            id: "plastices",
            title: "Plastices",
            image: lastices
          },
          {
            id: "olivos",
            title: "Los Olivos",
            image: olivos
          },
          {
            id: "pallay",
            title: "Pallay",
            image: pallay
          },
          {
            id: "tipika",
            title: "Atipika",
            image: tipika
          }
        ]}
        variant="clients"
        backgroundColor="#f8f9fa"
        style={{
          padding: '80px 0',
          margin: 0
        }}
      />

      <div id='contact'>
        <Footer />
      </div>

      <WhatsAppButton 
        message="Hola, me interesa conocer más sobre los servicios de brainon24"
      />
    </div>
  )
}
