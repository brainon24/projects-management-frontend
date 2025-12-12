import socialMediaImage from '../assets/services/social-media.jpg';
import webDevelopmentImage from '../assets/services/web-development.jpg';
import photographyImage from '../assets/services/photography.jpg';
import audiovisualImage from '../assets/services/audiovisual.jpg';
import graphicDesignImage from '../assets/services/graphic-desing.jpg';

import { 
  ServiceKeys, 
  Service, 
  ServicesDetails,
} from './interfaces';

import { 
  socialNetworkDetail,
  photographicProductionDetail,
  webDevelopmentDetail
} from './details';

import { diagnosticFormLink, whyBrainon24Section } from './shared-constants';

export * from './interfaces';
export { diagnosticFormLink, whyBrainon24Section };

export const services: Service[] = [
  {
    key: ServiceKeys.SOCIAL_NETWORK,
    title: "Redes Sociales",
    image: socialMediaImage,
    items: [
      {
        id: 'social-media-management',
        title: 'Caso Fonos',
        shortDescription: 'El poder de la emoción para visibilizar el B2B y el B2C.',
        image: socialMediaImage,
        detail: socialNetworkDetail
      },
    ]
  },
  {
    key: ServiceKeys.WEB_DEVELOPMENT,
    title: "Desarrollo Web",
    image: webDevelopmentImage,
    items: [
      {
        id: 'web-development-custom',
        title: 'Caso Frixo Lubricants',
        shortDescription: 'Creando significado a través de SEO y SEM para visibilizar y posiciónar la marca.',
        image: webDevelopmentImage,
        detail: webDevelopmentDetail
      }
    ]
  },
  {
    key: ServiceKeys.PHOTOGRAPHIC_PRODUCTION,
    title: "Producción Fotográfica",
    image: photographyImage,
    items: [
      {
        id: 'photographic-production-service',
        title: 'Caso Pallay',
        shortDescription: 'La relevancia de la fotografía para visibilizar la marca.',
        image: photographyImage,
        detail: photographicProductionDetail
      }
    ]
  },
  {
    key: ServiceKeys.AUDIOVISUAL_PRODUCTION,
    title: "Producción Audiovisual",
    image: audiovisualImage,
    items: [
      {
        id: 'audiovisual-production-service',
        title: 'Producción Audiovisual',
        shortDescription: 'Creación de contenido audiovisual de alta calidad para tu marca.',
        image: audiovisualImage
      }
    ]
  },
  {
    key: ServiceKeys.GRAPHIC_ARTS_DESIGN,
    title: "Artes gráficas y Diseño",
    image: graphicDesignImage,
    items: [
      {
        id: 'graphic-design-service',
        title: 'Diseño Gráfico',
        shortDescription: 'Diseño de identidad visual, branding y materiales gráficos.',
        image: graphicDesignImage
      }
    ]
  },
];

export const servicesDetails: ServicesDetails = {
  [ServiceKeys.SOCIAL_NETWORK]: socialNetworkDetail,
  [ServiceKeys.PHOTOGRAPHIC_PRODUCTION]: photographicProductionDetail,
  [ServiceKeys.WEB_DEVELOPMENT]: webDevelopmentDetail
};