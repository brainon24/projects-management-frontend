import { ServiceDetail } from '../interfaces';
import { diagnosticFormLink, whyBrainon24Section } from '../shared-constants';

export const audiovisualProductionDetail: ServiceDetail = {
  bannerVideo: {
    youtubeId: 'kcemH8JurbU',
  },
  sections: [
    {
      title: "Historias que conectan y le dan valor a tu negocio.",
      subtitle: "Aliado certificado brainon24 - Proyectos Especiales",
      additionalContent: [
        {
          text: "Con más de 15 años creando contenidos audiovisuales, animación y experiencias de realidad virtual y aumentada, Proyectos Especiales se ha consolidado como un aliado estratégico para empresas que necesitan comunicar con calidad, claridad y emoción.",
          bold: false
        },
        {
          text: "Trabajando, a nivel nacional, para todo tipo de organizaciones privadas y públicas, entregando soluciones que combinan una narrativa orientada a los objetivos, con gran estética y rigor técnico, para crear piezas que van más allá.",
          bold: false
        },
        {
          text: "Proyectos Especiales reduce los riesgos de los clientes con procesos claros, acompañamiento detallado y entregas puntuales.",
          bold: false
        }
      ]
    },
    {
      title: "Prueba social y resultados",
      content: [
        {
          text: "A lo largo de estos 15 años Proyectos Especiales ha producido más de 200 piezas audiovisuales entre videos institucionales, comerciales, animación y contenidos digitales para redes sociales.",
          bold: false
        }
      ],
      additionalContent: [
        {
          text: "Algunos resultados destacados:",
          bold: true
        },
        {
          text: "Producciones realizadas para instituciones del sector público y privado, logrando estándares de comunicación profesional y alto impacto visual.",
          bold: false
        }
      ]
    },
    {
      title: "Qué comprende nuestro servicio de producción audiovisual",
      content: [
        {
          text: "Contamos con un portafolio amplio en animación, contenido 3D, realidad aumentada y experiencias inmersivas, lo que permite llevar los mensajes a otro nivel y diferenciar las marcas en sus mercados.",
          bold: false
        }
      ]
    },
    {
      subtitle: "Elementos técnicos:",
      content: [
        {
          text: "Narrativas planeadas con foco en objetivos, estética cinematográfica y rigor técnico para cada pieza producida.",
          bold: false
        }
      ]
    },
    {
      cards: [
        {
          id: 'formatos-usos',
          title: 'Formatos y usos',
          list: [
            [
              {
                text: 'Spots de 15s / 30s / 1m',
                bold: false
              }
            ],
            [
              {
                text: 'Videos corporativos / institucionales',
                bold: false
              }
            ],
            [
              {
                text: 'Animación 2D, 3D y motion graphics',
                bold: false
              }
            ],
            [
              {
                text: 'Videos para pauta digital',
                bold: false
              }
            ],
            [
              {
                text: 'Experiencias inmersivas y contenido para realidad virtual y aumentada',
                bold: false
              }
            ]
          ],
          icon: 'video-recorder',
          backgroundColor: 'var(--orange-lighter)'
        },
        {
          id: 'tipos-entregables',
          title: 'Tipos de entregables',
          list: [
            [
              {
                text: 'Versiones en 16:9, 9:16, 1:1 según plataforma o requerimientos',
                bold: false
              }
            ],
            [
              {
                text: 'Subtitulados integrados (cuando el cliente lo requiera)',
                bold: false
              }
            ],
            [
              {
                text: 'Master final en alta resolución',
                bold: false
              }
            ],
            [
              {
                text: 'Raw footage disponible si el cliente lo requiere',
                bold: false
              }
            ],
            [
              {
                text: 'Archivos optimizados para redes, web y eventos',
                bold: false
              }
            ]
          ],
          icon: 'documento-seguridad',
          backgroundColor: 'var(--green-light)'
        },
        {
          id: 'plazos-revisiones',
          title: 'Plazos y revisiones',
          list: [
            [
              {
                text: 'Entregas ágiles: acordados con el cliente según complejidad',
                bold: false
              }
            ],
            [
              {
                text: 'Incluye 2 rondas de corrección sin costo adicional',
                bold: false
              }
            ],
            [
              {
                text: 'Acompañamiento desde la preproducción, con recolección de información, creación de guion y otros, hasta el master final',
                bold: false
              }
            ]
          ],
          icon: 'calendario'
        },
        {
          id: 'derechos',
          title: 'Derechos',
          list: [
            [
              {
                text: 'Música y recursos con licencias incluidas',
                bold: false
              }
            ],
            [
              {
                text: 'Entregables con derechos de uso para el cliente según proyecto',
                bold: false
              }
            ]
          ],
          icon: 'shield-tick',
          backgroundColor: 'var(--green-light)'
        }
      ]
    },
    {
      title: "A través de la alianza brainon24 y Proyectos Especiales, buscamos:",
      list: [
        [
          {
            text: "Maximizar el valor de cada pieza audiovisual, aplicando estándares de calidad, planos cinematográficos y dominio de las técnicas.",
            bold: false
          }
        ],
        [
          {
            text: "Aportamos una visión creativa y conocimiento sectorial, especialmente en proyectos institucionales, educativos, ambientales, comerciales y de innovación.",
            bold: false
          }
        ],
        [
          {
            text: "Trabajamos con rapidez y con método, lo que nos permite mantener consistencia en todos nuestros contenidos.",
            bold: false
          }
        ],
        [
          {
            text: "Creamos historias poderosas, memorables y efectivas que combinan producción audiovisual, animación y experiencias de realidad virtual, aumentada e inmersiva.",
            bold: false
          }
        ]
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
          type: 'google-forms',
          to: diagnosticFormLink
        }
      ]
    },
    whyBrainon24Section
  ]
};
