import socialMediaImage from '../assets/services/social-media.jpg';
import webDevelopmentImage from '../assets/services/web-development.jpg';
import photographyImage from '../assets/services/photography.jpg';
import audiovisualImage from '../assets/services/audiovisual.jpg';
import graphicDesignImage from '../assets/services/graphic-desing.jpg';
import socialMediaBanner1 from '../assets/social-media/redes-sociales1.jpg';
import socialMediaBanner2 from '../assets/social-media/redes-sociales2.jpg';

export enum ServiceKeys {
  SOCIAL_NETWORK = 'social-network',
  WEB_DEVELOPMENT = 'web-development',
  PHOTOGRAPHIC_PRODUCTION = 'photographic-production',
  AUDIOVISUAL_PRODUCTION = 'audiovisual-production',
  GRAPHIC_ARTS_DESIGN = 'graphic-arts-design',
//   BPO = 'bpo',
//   COMMERCIAL_STRATEGY = 'commercial-strategy',
//   FAIR_EVENT_STANDS = 'fair-event-stands',
}

export interface TextContent {
  text: string;
  bold: boolean;
}

export interface SublistItem {
  sublist?: TextContent[][];
}

export interface ListItem extends Array<TextContent | SublistItem> {}

export interface LinkItem {
  text: string;
  type: 'google-forms';
  to: string;
}

export const diagnosticFormLink = "https://forms.gle/m5jiiPShTKdNafvi8";

export interface ServiceSection {
  title?: string;
  subtitle?: string;
  content?: TextContent[];
  additionalContent?: TextContent[];
  list?: ListItem[];
  additionalList?: ListItem[];
  conditions?: ListItem[];
  signature?: string;
  links?: LinkItem[];
}

export interface ServiceDetail {
  sections: ServiceSection[];
  bannerImages?: {
    src: string;
    alt: string;
    backgroundColor?: string;
  }[];
}

export interface Service {
  key: ServiceKeys;
  title: string;
  image: string;
}

export type ServicesDetails = {
  [key in ServiceKeys]?: ServiceDetail;
}

export const services: Service[] = [
  {
    key: ServiceKeys.SOCIAL_NETWORK,
    title: "Redes Sociales",
    image: socialMediaImage,
  },
  {
    key: ServiceKeys.WEB_DEVELOPMENT,
    title: "Desarrollo Web",
    image: webDevelopmentImage,
  },
  {
    key: ServiceKeys.PHOTOGRAPHIC_PRODUCTION,
    title: "Producción Fotográfica",
    image: photographyImage,
  },
  {
    key: ServiceKeys.AUDIOVISUAL_PRODUCTION,
    title: "Producción Audiovisual",
    image: audiovisualImage,
  },
  {
    key: ServiceKeys.GRAPHIC_ARTS_DESIGN,
    title: "Artes gráficas y Diseño",
    image: graphicDesignImage,
  },
//   {
//     key: ServiceKeys.BPO,
//     title: "BPO",
//     image: ""
//   },
//   {
//     key: ServiceKeys.COMMERCIAL_STRATEGY,
//     title: "Estrategia comercial",
//     image: ""
//   },
//   {
//     key: ServiceKeys.FAIR_EVENT_STANDS,
//     title: "Stands para Ferias y Eventos",
//     image: ""
//   },
];

export const servicesDetails: ServicesDetails = {
  [ServiceKeys.SOCIAL_NETWORK]: {
    bannerImages: [
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
    sections: [
      {
        title: "Cómo FONOS conectó con sus mercados y dinamizó sus ventas",
        content: [
          {
            text: "En una categoría competitiva y de productos técnicos —",
            bold: false
          },
          {
            text: "B2B y B2C",
            bold: true
          },
          {
            text: "— donde prima lo funcional que es muy \"frío\", desde 2023 trabajamos la marca ",
            bold: false
          },
          {
            text: "FONOS",
            bold: true
          },
          {
            text: " con una estrategia centrada en sus valores. Construimos una narrativa que pone en el centro a su público: trabajadores, soldadores y personal de industria.",
            bold: false
          }
        ],
        additionalContent: [
          {
            text: "Al comunicar la importancia de la protección y la seguridad vinculada a las marcas que comercializa ",
            bold: false
          },
          {
            text: "FONOS",
            bold: true
          },
          {
            text: ", logramos transformar percepción en preferencia y dinamizar las ventas por encima del promedio de la categoría.",
            bold: false
          }
        ]
      },
      {
        subtitle: "Estrategia (qué hicimos)",
        list: [
          [{ text: "Posicionamiento por empatía: ", bold: true}, {text: "convertimos el mensaje técnico en una historia humana sobre cuidado y profesionalismo.", bold: false}],
          [{ text: "Segmentación geo-comercial: ", bold: true}, {text: "enfoque en Cúcuta, Los Patios y Norte de Santander para maximizar relevancia local.", bold: false}],
          [{ text: "Contenidos prácticos y de autoridad: ", bold: true}, {text: "piezas educativas, testimonios de campo y demostraciones que reforzaron credibilidad.", bold: false}],
          [{ text: "Ejecución multicanal: ", bold: true}, {text: "pauta y orgánico integrados en Facebook e Instagram, con optimización continua por resultados.", bold: false}],
          [{ text: "Medición compartida: ", bold: true}, {text: "Dashboard con KPI's claros (alcances, engagement, CTR, views, leads atribuibles).", bold: false}],
        ]
      },
      {
        subtitle: "Resultados relevantes (impacto medible)",
        list: [
          [{ text: "Cobertura geo-comercial: Cúcuta, Los Patios y Norte de Santander.", bold: false }],
          [{ text: "Engagement: Facebook promedio ", bold: false }, { text: "12.8%", bold: true }, { text: " — Instagram promedio ", bold: false }, { text: "7.4%", bold: true }],
          [{ text: "CTR: Facebook promedio ", bold: false }, { text: "6.1%", bold: true }, { text: " — Instagram promedio ", bold: false }, { text: "1.4%", bold: true }],
          [{ text: "Views (parcial 2025): Facebook ≈ ", bold: false }, { text: "387.000", bold: true }, { text: " — Instagram ≈ ", bold: false }, { text: "169.000", bold: true }]
        ]
      },
      {
        subtitle: "Impacto comercial:",
        list: [
          [{ text: "Aumento de visibilidad estratégica y fortalecimiento del posicionamiento de ", bold: false }, { text: "FONOS", bold: true }, { text: " como proveedor confiable para trabajadores industriales.", bold: false }],
          [{ text: "Incremento en consultas y tráfico a puntos de venta en la zona objetivo (medible en leads y visitas en puntos de venta).", bold: false }]
        ]
      },
      {
        subtitle: "¿Qué le encantó al cliente de brainon24?",
        content: [
          {
            text: "\"El trabajo de ",
            bold: false
          },
          {
            text: "brainon24",
            bold: true
          },
          {
            text: " ha fortalecido el posicionamiento de ",
            bold: false
          },
          {
            text: "FONOS",
            bold: true
          },
          {
            text: " con estrategias creativas y mensajes que conectan tanto con trabajadores como con gerentes.",
            bold: false
          }
        ],
        additionalContent: [
          {
            text: "Su enfoque combina comunicación efectiva, conocimiento técnico e impacto real en nuestros resultados\".",
            bold: false
          }
        ],
        signature: "Gerencia FONOS."
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
        subtitle: "Estrategia y contenido.",
        list: [
          [{ text: "Desarrollo de brief y ADN de marca.", bold: false }],
          [{ text: "Cocreación con la empresaria o empresario a través del brief.", bold: false }],
          [{ text: "Generación de Concepto de Posicionamiento.", bold: false }],
          [{ text: "Propuesta de líneas de comunicación.", bold: false }],
          [
            { text: "Generación de contenido:", bold: false },
            {
              sublist: [
                [{ text: "Creación de copies y hashtags", bold: false }],
                [{ text: "Diseño de piezas gráficas y/o edición de videos", bold: false }]
              ]
            }
          ],
          [{ text: "Envío de cronograma de publicaciones", bold: false }],
          [{ text: "Publicación de posts e historias", bold: false }],
          [{ text: "Servicio al cliente: respuesta a mensajes y comentarios", bold: false }],
          [{ text: "Entrega de informe mensual de resultados y planeación de actividades a seguir.", bold: false }]
        ]
      },
      {
        subtitle: "Pauta digital en Meta.",
        content: [
          {
            text: "Parte 1:",
            bold: true
          }
        ],
        list: [
          [{ text: "Asesoría", bold: false }],
          [{ text: "Explicación de tipos de pauta.", bold: false }],
          [{ text: "Definición de estrategia.", bold: false }],
          [{ text: "Segmentación de público objetivo.", bold: false }],
          [{ text: "Elección de intereses.", bold: false }],
          [{ text: "Distribución del presupuesto.", bold: false }],
          [{ text: "Recomendaciones de contenidos.", bold: false }]
        ],
        additionalContent: [
          {
            text: "Parte 2:",
            bold: true
          }
        ],
        additionalList: [
          [{ text: "Ejecución de la campaña.", bold: false }],
          [{ text: "Monitoreo y seguimiento.", bold: false }],
          [{ text: "Entrega del informe de resultados.", bold: false }]
        ]
      },
      {
        subtitle: "Presupuestos:",
        list: [
          [{ text: "8 publicaciones al mes", bold: false }],
          [{ text: "12 publicaciones al mes.", bold: false }],
          [{ text: "16 publicaciones al mes.", bold: false }]
        ],
        conditions: [
          [{ text: "*Mínimo 3 meses de trabajo para verse resultados.", bold: false }],
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
      {
        title: "¿Por qué brainon24?",
        list: [
          [{ text: "Por cobertura geográfica.", bold: false }],
          [{ text: "Por optimización del gasto. (", bold: false }, { text: "Inversión", bold: true }, { text: ")", bold: false }],
          [{ text: "Por equipos de trabajo certificados. (", bold: false }, { text: "Experiencia y resultados", bold: true }, { text: ").", bold: false }],
          [{ text: "Por estrategias de comunicación pensadas para cada cliente.", bold: false }],
          [{ text: "Por un pensamiento 360 grados. ", bold: false }, { text: "Cocreación", bold: true }, { text: " con la empresaria o el empresario.", bold: false }],
          [{ text: "Por la evaluación y análisis de resultados. ", bold: false }, { text: "Principales Métricas y ROI", bold: true }, { text: ".", bold: false }],
          [{ text: "Por el Acompañamiento permanente. (", bold: false }, { text: "Comprometidos con el proceso y los resultados", bold: true }, { text: ")", bold: false }]
        ]
      }
    ]
  }
};