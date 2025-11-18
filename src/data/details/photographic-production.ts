import { ServiceDetail } from '../interfaces';
import { diagnosticFormLink, whyBrainon24Section } from '../shared-constants';
import photographicProduction1 from '../../assets/services/photographic-production/banners/desktop/photographic-production1.jpg';
import photographicProductionM1 from '../../assets/services/photographic-production/banners/mobile/photographic-production1.jpg';

export const photographicProductionDetail: ServiceDetail = {
  bannerImages: {
    desktop: [
      {
        src: photographicProduction1,
        alt: "Producción Fotográfica - Capturamos la esencia de tu marca",
        backgroundColor: '#fff'
      }  
    ],
    mobile: [
      {
        src: photographicProductionM1,
        alt: "Producción Fotográfica - Capturamos la esencia de tu marca",
        backgroundColor: '#fff'
      }
    ],
  },
  sections: [
    {
      title: "Así conectamos a Pallay con sus mercados",
      content: [
        {
          text: "En un mundo dominado por el fast fashion, Pallay reivindica la artesanía como un acto de sostenibilidad y libertad, creando prendas que conectan a las mujeres con su esencia y con el valor del hecho a mano.",
          bold: false
        }
      ]
    },
    {
      cards: [
        {
          id: "estrategia-pallay",
          title: "Estrategia (qué hicimos)",
          description: [
            {
              text: "Posicionamiento por afinidad: resaltamos la artesanía como valor competitivo y usamos la fotografía digital como pilar comunicacional.",
              bold: false
            }
          ],
          list: [
            [{ text: "Geo: Medellín y Bogotá.", bold: false }],
            [{ text: "Contenidos multicanal (Meta: Instagram como red principal y Facebook como secundaria).", bold: false }],
            [{ text: "Con KPI's claros.", bold: false }]
          ],
          icon: "target-03",
          backgroundColor: "var(--orange-lighter)"
        },
        {
          id: "resultados-pallay",
          title: "Resultados relevantes (impacto medible): Inversión que genera resultados",
          list: [
            [{ text: "Engagement Instagram: ", bold: false }, { text: ">10%", bold: true }],
            [{ text: "CTR Instagram: ", bold: false }, { text: "2.9%", bold: true }],
            [{ text: "Views IG: ", bold: false }, { text: ">100.000", bold: true }],
            [{ text: "Crecimiento en seguidores, año: ", bold: false }, { text: "74%", bold: true }]
          ],
          icon: "line-chart-up-02",
          backgroundColor: "var(--green-light)"
        },
        {
          id: "impacto-comercial-pallay",
          title: "Impacto comercial",
          description: [
            {
              text: "El mayor reconocimiento de Pallay y su proceso artesanal impulsó alianzas públicas y privadas, permitiendo presencia en Colombia Moda, Expoartesanías y colaboraciones con diseñadores.",
              bold: false
            }
          ],
          icon: "presentation-chart-01"
        },
        {
          id: "testimonial-pallay",
          title: "¿Qué conectó a Tejidos Pallay con brainon24?",
          description: [
            {
              text: "\"brainon24 se comprometió con el propósito de la marca, creando piezas que visibilizan la artesanía de Pallay y fortalecieron su posicionamiento y alianzas\".",
              bold: false
            }
          ],
          signature: "Gerencia Tejidos Pallay.",
          icon: "corazon-mano",
          backgroundColor: "var(--green-light)"
        }
      ]
    },
    {
      title: "Qué comprende nuestro servicio de fotografía",
      subtitle: "\"Una imagen generada impacta; una fotografía auténtica conecta. Y esa conexión no se artificializa\".",
      content: [
        {
          text: "Fotografía estratégica que conecta: producimos imágenes a la medida del propósito de tu negocio, alineadas con tus objetivos de posicionamiento y/o comerciales. Tomadas para fortalecer el reconocimiento, la confianza de los en todos tus canales digitales y físicos.",
          bold: false
        }
      ]
    },
    {
      subtitle: "Tipos:",
      list: [
        [{ text: "Fotografía de producto: ", bold: true }, { text: "Imágenes limpias y neutras para mostrar el producto con precisión (packshots).", bold: false }],
        [{ text: "Producción fotográfica de producto con movimiento 360°: ", bold: true }, { text: "Renders fotográficos que permiten rotar el producto online (spin interactivo).", bold: false }],
        [{ text: "Fotografía de modelos (editorial / lookbook): ", bold: true }, { text: "Producción creativa con modelos para comunicar el uso, identidad y tono de marca.", bold: false }],
        [{ text: "Fotografía de espacios arquitectónicos: ", bold: true }, { text: "Imágenes que comunican escala, atmósfera y detalle de espacios (interiores/exteriores).", bold: false }]
      ]
    },
    {
      title: "Condiciones comerciales brainon24",
      list: [
        [{ text: "Alcance y entregables claros: número de imágenes finales incluidas, formatos, peso y resolución.", bold: false }],
        [{ text: "Derechos de uso.", bold: false }],
        [{ text: "Retoque y correcciones.", bold: false }],
        [{ text: "Formatos de entrega.", bold: false }],
        [{ text: "Requisitos del cliente.", bold: false }],
        [{ text: "Garantía de color: prueba de color y perfil ICC si se requiere para impresión.", bold: false }],
        [{ text: "Política de revisiones.", bold: false }],
        [{ text: "Condiciones de producción: estudio o locación, permisos, logística y responsabilidades (suministrar vestuario, por ejemplo).", bold: false }],
        [{ text: "Entrega y backups: tiempo de subida/entrega en drive/FTP y retención de archivos maestros por X meses (definir en contrato).", bold: false }]
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