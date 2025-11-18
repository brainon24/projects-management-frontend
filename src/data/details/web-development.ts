import { ServiceDetail } from '../interfaces';
import { diagnosticFormLink, whyBrainon24Section } from '../shared-constants';
import webDevelopment1 from '../../assets/services/web-development/banners/desktop/web-development1.jpg';
import webDevelopmentM1 from '../../assets/services/web-development/banners/mobile/web-development1.jpg';

export const webDevelopmentDetail: ServiceDetail = {
  bannerImages: {
    desktop: [
        {
            src: webDevelopment1,
            alt: "Desarrollo Web - Tu presencia digital efectiva",
            backgroundColor: '#fff'
        }
    ],
    mobile: [
      {
        src: webDevelopmentM1,
        alt: "Desarrollo Web - Tu presencia digital efectiva",
        backgroundColor: '#fff'
      }
    ],
  },
  sections: [
    {
      title: "Así conectamos a FRIXO con sus mercados",
      content: [
        {
          text: "Entendimos la importancia de mantener plantas rentables: comunicamos la lubricación como eje del movimiento continuo para prevenir paradas y prolongar la vida útil de los equipos. Logramos relevancia de la marca para los mercados industriales.",
          bold: false
        }
      ]
    },
    {
      cards: [
        {
          id: "estrategia-frixo",
          title: "Estrategia (qué hicimos)",
          description: [
            {
              text: "Posicionamiento por confiabilidad técnica: Evidenciamos que las condiciones extremas ya no son problema.",
              bold: false
            }
          ],
          list: [
            [{ text: "Geo-comercial: Colombia, Panamá, Perú y Ecuador.", bold: false }],
            [{ text: "Contenidos multicanal: Sitio Web/SEO – Content - SEM – Google Ads. / Meta Ads (Facebook).", bold: false }],
            [{ text: "Dashboard con KPI's claros.", bold: false }]
          ],
          icon: "target-03",
          backgroundColor: "var(--orange-lighter)"
        },
        {
          id: "resultados-frixo",
          title: "Resultados relevantes (impacto medible 2025): Inversión que genera resultados",
          description: [
            {
              text: "Crecimiento interanual de usuarios con aporte orgánico. Rebote <50%. Aumenta el tiempo de interacción y duración media de sesión. CTR Display >3% y search >5%. Rendimiento estable y optimización continua.",
              bold: false
            }
          ],
          icon: "line-chart-up-02",
          backgroundColor: "var(--green-light)"
        },
        {
          id: "impacto-comercial-frixo",
          title: "Impacto comercial",
          list: [
            [{ text: "Aumento del reconocimiento y fortalecimiento del posicionamiento de FRIXO, como proveedor confiable para los ingenieros de mantenimiento de las diferentes industrias de la región.", bold: false }],
            [{ text: "Dinamizamos ventas por encima del promedio de la categoría.", bold: false }]
          ],
          icon: "presentation-chart-01"
        },
        {
          id: "testimonial-frixo",
          title: "¿Qué conectó a FRIXO con brainon24?",
          description: [
            {
              text: "\"BrainOn24 ha convertido la estrategia \"Siempre en Movimiento\" en resultados reales: mayor visibilidad, leads técnicos y posicionamiento sólido. Su trabajo impulsa nuestro crecimiento.\"",
              bold: false
            }
          ],
          signature: "Gerencia FRIXO.",
          icon: "corazon-mano",
          backgroundColor: "var(--green-light)"
        }
      ]
    },
    {
      title: "Qué comprende nuestro servicio Desarrollo Web",
      subtitle: "Recuerda: \"Lo que no está en la red no existe\".",
      content: [
        {
          text: "Diseñamos y desarrollamos sitios web que convierten: creados a la medida de tu propósito, alineados a tus objetivos comerciales y listos para impulsar el crecimiento de tu negocio.",
          bold: false
        }
      ]
    },
    {
      subtitle: "Tipos: Sitios informativos y Tiendas online.",
      list: [
        [{ text: "Alcance del proyecto: ", bold: true }, { text: "Páginas, funcionalidades, integraciones, backend, panel administrativo.", bold: false }],
        [{ text: "Tecnología y arquitectura: ", bold: true }, { text: "Frameworks, CMS, bases de datos, escalabilidad, seguridad.", bold: false }],
        [{ text: "UX/UI y diseño: ", bold: true }, { text: "Wireframes, prototipos, look & feel, responsive, accesibilidad.", bold: false }],
        [{ text: "Cronograma y entregables: ", bold: true }, { text: "Versiones, pruebas, puesta en producción, despliegue.", bold: false }],
        [{ text: "Crear la propiedad en Google Analytics 4 (GA4): ", bold: true }, { text: "Integra con Google Analytics, creas la cuenta o propiedad y/o dominio, zona horaria y moneda.", bold: false }],
        [{ text: "Costos y condiciones: ", bold: true }, { text: "Valor por fase, mantenimiento, soporte, garantías, propiedad intelectual.", bold: false }]
      ]
    },
    {
      title: "Condiciones comerciales brainon24",
      conditions: [
        [{ text: "*El tiempo de desarrollo dependerá de la entrega oportuna de la información por parte del cliente y los tiempos de revisiones.", bold: false }],
        [{ text: "*Ideal que la empresa cuente con una estrategia comercial definida y que se esté implementando para que las redes sea un impulso a esta gestión.", bold: false }]
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