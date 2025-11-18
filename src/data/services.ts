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
];

export const servicesDetails: ServicesDetails = {
  [ServiceKeys.SOCIAL_NETWORK]: socialNetworkDetail,
  [ServiceKeys.PHOTOGRAPHIC_PRODUCTION]: photographicProductionDetail,
  [ServiceKeys.WEB_DEVELOPMENT]: webDevelopmentDetail
};