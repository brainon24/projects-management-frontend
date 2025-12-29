import { ServiceDetail } from '../interfaces';
import { diagnosticFormLink, whyBrainon24Section } from '../shared-constants';
import graphicArtsDesign1 from '../../assets/services/graphic-arts-design/banners/desktop/graphic-arts-design1.jpg';
import graphicArtsDesignM1 from '../../assets/services/graphic-arts-design/banners/mobile/graphic-arts-design1.jpg';

export const graphicArtsDesignDetail: ServiceDetail = {
  bannerImages: {
    desktop: [
      {
        src: graphicArtsDesign1,
        alt: 'Artes gráficas y diseño - Comunicación visual estratégica',
        backgroundColor: '#fff'
      }
    ],
    mobile: [
      {
        src: graphicArtsDesignM1,
        alt: 'Artes gráficas y diseño - Comunicación visual estratégica',
        backgroundColor: '#fff'
      }
    ]
  },
  sections: [
    {
      title: 'Artes gráficas y Diseño',
      subtitle: 'Diseño de documentos digitales y decoración de espacios que le dan valor a tu negocio.',
      content: [
        {
          text: 'Nuestra propuesta de comunicación estratégica y arquitectura visual integra el diseño de activos digitales de alta conversión, incluyendo e-books, fichas técnicas, catálogos y presentaciones corporativas, con la intervención técnica de espacios físicos a través de señalética y decoración, fundamentando cada pieza en principios de psicología del consumidor y jerarquización de la información.',
          bold: false
        }
      ],
      additionalContent: [
        {
          text: 'Proyectamos solidez comercial y autoridad, basados en la profesionalización absoluta de cada punto de contacto con el cliente.',
          bold: false
        }
      ]
    },
    {
      title: 'Aliados certificados brainon24',
      list: [
        [
          {
            text: 'Diseñadora Natalia Artuz',
            bold: false
          }
        ],
        [
          {
            text: 'HILO Conectando ideas',
            bold: false
          }
        ]
      ]
    },
    {
      title: 'Qué comprende nuestro servicio de artes gráficas y diseño',
      content: [
        {
          text: 'Este servicio está pensado para empresas que requieren unificar su fuerza de ventas con su infraestructura física bajo un estándar de clase mundial.',
          bold: false
        },
        {
          text: 'La solución fusiona la Inteligencia Digital (presentaciones de alto impacto para licitaciones, fichas técnicas de alta precisión, catálogos dinámicos y e-books de autoridad) con la Arquitectura Corporativa (señalética de seguridad/flujo y branding ambiental de plantas y oficinas).',
          bold: false
        },
        {
          text: 'El resultado es un ecosistema de comunicación 360 grados que transforma la complejidad técnica en claridad comercial, asegurando que cada activo, desde un PDF de producto hasta la fachada de su complejo industrial, proyecte rigor técnico, fiabilidad y una ventaja competitiva indiscutible ante socios globales.',
          bold: false
        }
      ]
    },
    {
      subtitle: '¿Qué incluye este ecosistema?',
      list: [
        [
          {
            text: 'Activos de Conversión:',
            bold: true
          },
          {
            text: ' Master Docks para licitaciones y capacitaciones (50 o 100 diapositivas organizadas por categorías), catálogos de productos y fichas técnicas optimizadas para lectura eficiente.',
            bold: false
          }
        ],
        [
          {
            text: 'Autoridad Digital:',
            bold: true
          },
          {
            text: ' E-books técnicos e infografías de procesos complejos para generar confianza en el comprador técnico.',
            bold: false
          }
        ],
        [
          {
            text: 'Infraestructura Visual:',
            bold: true
          },
          {
            text: ' Diseño de señalética y decoración de espacios que conectan la identidad de marca con la seguridad y la eficiencia en sitio.',
            bold: false
          }
        ]
      ]
    },
    {
      title: 'Condiciones comerciales brainon24',
      conditions: [
        [
          {
            text: 'Objetivo y entregables claros. Requisitos del cliente.',
            bold: false
          }
        ],
        [
          {
            text: 'Flujo de trabajo y cronograma.',
            bold: false
          }
        ],
        [
          {
            text: 'Responsabilidad por información técnica proporcionada.',
            bold: false
          }
        ],
        [
          {
            text: 'Referencias de estilo / brandbook (si existe).',
            bold: false
          }
        ],
        [
          {
            text: 'Derechos y licencias especificadas.',
            bold: false
          }
        ],
        [
          {
            text: 'Muestras visuales incluidas.',
            bold: false
          }
        ],
        [
          {
            text: 'Archivos de entregas tanto en digital como para impresión: PDF, JPG/PNG.',
            bold: false
          }
        ],
        [
          {
            text: 'Entrega por Drive / WeTransfer más paquete de InDesign comprimido en ZIP.',
            bold: false
          }
        ],
        [
          {
            text: 'Acordar número de revisiones, aprobaciones y control de cambios.',
            bold: false
          }
        ],
        [
          {
            text: 'No está incluido: toma de fotografías, redacción de textos largos, traducciones, compra de imágenes o tipografías e impresión litográfica.',
            bold: false
          }
        ],
        [
          {
            text: 'Política de cambios mayores (revisiones que implican rediseño: tarifar aparte).',
            bold: false
          }
        ]
      ]
    },
    {
      title: '"Quiero mejorar mi comunicación para incrementar mis ventas"',
      subtitle: 'Diagnóstico',
      content: [
        {
          text: 'Business Communication Health Score: Puntuación de la Salud de la comunicación empresarial.',
          bold: true
        }
      ],
      additionalContent: [
        {
          text: 'Mientras lo piensas, antes de iniciar la estrategia, vamos a conocer qué tanto está impactando la comunicación que hoy haces en tu negocio: en su visibilidad y ventas.',
          bold: false
        }
      ],
      links: [
        {
          text: 'Empecemos con un diagnóstico sin costo.',
          type: 'google-forms',
          to: diagnosticFormLink
        }
      ]
    },
    whyBrainon24Section
  ]
};
