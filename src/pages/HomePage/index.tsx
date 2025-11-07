import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header'

import styles from './styles.module.css'
import './styles.css'
import { HowWeDoItTimeline } from '../../components/HowWeDoItTimeline';

import desktopBanner1 from '../../assets/banners/desktop-banner-1.jpg'
import mobileBanner1 from '../../assets/banners/mobile-banner-1.jpg'


export const HomePage = () => {
  
  // Desktop -> 1280px x 400px & Mobile -> 650px x 400px
  const desktopBanners = [desktopBanner1];
  const mobileBanners = [mobileBanner1];

  return (
    <div id='home'>
      <Header />
      <div className={styles.container}>
        <div className={styles.desktopBanners}>
          <Swiper
              cssMode
              navigation
              pagination
              mousewheel
              keyboard
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
              className="swiper-container"
              autoplay={{
                  delay: 5000,
              }}
          >
            {
              desktopBanners.map((banner, idx) => (
                <SwiperSlide key={idx+banner}>
                  <img src={banner} alt="Banner" width={800} loading="lazy" style={{objectFit: 'contain'}} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className={styles.mobileBanners}>
          <Swiper
              cssMode
              navigation
              pagination
              mousewheel
              keyboard
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
              className="swiper-container"
              autoplay={{
                  delay: 5000,
              }}
          >
            {
              mobileBanners.map((banner, idx) => (
                <SwiperSlide key={idx+banner}>
                  <img src={banner} alt="Banner" width={800} loading="lazy" style={{objectFit: 'contain'}} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <h2 className={styles.connectionsSubtitle}>Conexiones que le dan valor a tu negocio</h2>
        <p className={styles.connectionText}>Plataforma de estrategia y ejecución en marketing para MiPymes: diagnósticos, aliados certificados y campañas que convierten visibilidad en ventas.</p>
        <div className={styles.connectionButtonsContainer}>
          <Button>Solicitar diagnóstico gratuito</Button>
          <Button variant='border'>Ver servicios</Button>
        </div>

        <div id='about' className={styles.aboutContainer}>
          <h2 className={styles.sectionHead}>Nosotros</h2>
          <p>Somos la Plataforma de Conexiones de Marca Brand-Connection Platform que conecta a las MiPymes con la estrategia y una ejecución profesional que necesitan para ser visibles, relevantes y rentables.</p>
          <p>Planeamos, conceptualizamos, diseñamos y producimos campañas ejecutables en medios on y offline y te acompañamos en la implementación para que cada inversión en comunicación se traduzca en reconocimiento y ventas.</p>

          <div className={styles.howWeDoItTimelineContainer}>
            <h3>Cómo lo hacemos</h3>
            <HowWeDoItTimeline />
          </div>
        </div>

        <div id='contact'>
          <h2 className={styles.sectionHead}>Contacto</h2>

          
        </div>
      </div>
    </div>
  )
}
