import { ServiceDetail } from '../interfaces';
import { diagnosticFormLink, whyBrainon24Section } from '../shared-constants';

import socialMediaBanner1 from '../../assets/services/social-media/banners/desktop/redes-sociales1.jpg';
import socialMediaBanner2 from '../../assets/services/social-media/banners/desktop/redes-sociales2.jpg';
import socialMediaBannerM1 from '../../assets/services/social-media/banners/mobile/redes-sociales1.jpg';
import socialMediaBannerM2 from '../../assets/services/social-media/banners/mobile/redes-sociales2.jpg';

export const socialNetworkDetail: ServiceDetail = {
  bannerImages: {
    desktop: [
      {
        src: socialMediaBanner1,
        alt: "Redes Sociales - Impulsa tu presencia digital",
        backgroundColor: '#fff'
      },
      {
        src: socialMediaBanner2,
        alt: "Redes Sociales - Conecta con tu audiencia",
        backgroundColor: '#fff'
      }
    ],
    mobile: [
      {
        src: socialMediaBannerM1,
        alt: "Redes Sociales - Impulsa tu presencia digital",
        backgroundColor: '#fff'
      },
      {
        src: socialMediaBannerM2,
        alt: "Redes Sociales - Conecta con tu audiencia",
        backgroundColor: '#fff'
      }
    ]
  },
  sections: [
    {
      title: "Así conectamos FONOS con sus mercados",
      content: [
        {
          text: "Al comunicar y visibilizar, la seguridad, asociada a la marca FONOS, transformamos percepción en preferencia, Impulsando confianza y preferencia sostenida.",
          bold: false
        }
      ]
    },
    {
      cards: [
        {
          id: "estrategia",
          title: "Estrategia (qué hicimos)",
          description: [
            {
              text: "Posicionamiento por empatía: convertimos lo técnico en historias humanas.",
              bold: false
            }
          ],
          list: [
            [{ text: "Geo-comercial: Colombia: Cúcuta, Los Patios y Norte de Santander. Venezuela: Ciudades de frontera.", bold: false }],
            [{ text: "Contenidos prácticos y multicanal en Redes sociales Meta (Facebook – Instagram – Whatsapp).", bold: false }],
            [{ text: "Dashboard con KPI's claros.", bold: false }]
          ],
          icon: "target-03",
          backgroundColor: "var(--orange-lighter)"
        },
        {
          id: "resultados",
          title: "Resultados relevantes (impacto medible): Inversión que genera resultados",
          subtitle: "Métricas parciales 2025:",
          list: [
            [{ text: "Engagement FB ", bold: false }, { text: "12.8%", bold: true }, { text: " · IG ", bold: false }, { text: "7.4%", bold: true }],
            [{ text: "CTR FB ", bold: false }, { text: "6.1%", bold: true }, { text: " · IG ", bold: false }, { text: "1.4%", bold: true }],
            [{ text: "Views: FB ", bold: false }, { text: "387.000", bold: true }, { text: " — IG ", bold: false }, { text: "169.000", bold: true }]
          ],
          icon: "line-chart-up-02",
          backgroundColor: "var(--green-light)"
        },
        {
          id: "impacto-comercial",
          title: "Impacto comercial",
          list: [
            [{ text: "Aumento del reconocimiento y fortalecimiento del posicionamiento de FONOS, como proveedor confiable para trabajadores industriales e instituciones y pacientes de la salud respiratoria.", bold: false }],
            [{ text: "Dinamizamos ventas por encima del promedio de la categoría.", bold: false }]
          ],
          icon: "presentation-chart-01"
        },
        {
          id: "testimonial-fonos",
          title: "¿Qué conectó a FONOS con brainon24?",
          description: [
            {
              text: "\"brainon24 ha fortalecido el posicionamiento de FONOS con estrategias creativas y comunicación efectiva, combinando conocimiento técnico e impacto real en nuestros resultados.\"",
              bold: false
            }
          ],
          signature: "Gerencia FONOS.",
          icon: "corazon-mano",
          backgroundColor: "var(--green-light)"
        }
      ]
    },
    {
      title: "Qué comprende nuestro servicio de gestión de redes:",
      subtitle: "Contenido que conectará a tu público.",
      content: [
        {
          text: "Administramos y gestionamos las redes sociales de ",
          bold: false
        },
        {
          text: "meta",
          bold: true
        },
        {
          text: " (Facebook - Instagram - Whatsapp), desde la estrategia de comunicación y de posicionamiento hasta su ejecución:",
          bold: false
        }
      ]
    },
    {
      subtitle: "Contenido:",
      list: [
        [{ text: "Estrategia de comunicación y posicionamiento.", bold: false }],
        [{ text: "Contenido.", bold: false }],
        [{ text: "Análisis de resultados.", bold: false }],
        [{ text: "Acompañamiento.", bold: false }]
      ]
    },
    {
      subtitle: "Pauta digital en Meta.",
      list: [
        [{ text: "Planeación y ejecución de la campaña, según la inversión.", bold: false }],
        [{ text: "Monitoreo y seguimiento.", bold: false }],
        [{ text: "Entrega del informe de resultados.", bold: false }]
      ]
    },
    {
      title: "Condiciones comerciales brainon24",
      conditions: [
        [{ text: "*Mínimo 3 meses de trabajo para ver resultados.", bold: false }],
        [{ text: "*Ideal que la empresa cuente con una estrategia comercial definida y que se esté implementando para que las redes sean un impulso a esta gestión.", bold: false }]
      ]
    },
    {
      title: "\"Quiero mejorar mi comunicación para incrementar mis ventas\"",
      subtitle: "Diagnóstico",
      content: [
        {
          text: "Business Communication Health Score: Puntuación de la Salud de la comunicación empresarial.",
          bold: true
        }
      ],
      additionalContent: [
        {
          text: "Mientras lo piensas, antes de iniciar la estrategia, vamos a conocer que tanto está impactando la comunicación que hoy haces en tu negocio: en su visibilidad y ventas.",
          bold: false
        }
      ],
      links: [
        {
          text: "Empecemos con un diagnóstico sin costo.",
          type: "google-forms",
          to: diagnosticFormLink
        },
      ]
    },
    whyBrainon24Section
  ]
};