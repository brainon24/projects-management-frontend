export enum ServiceKeys {
  SOCIAL_NETWORK = 'social-network',
  WEB_DEVELOPMENT = 'web-development',
  PHOTOGRAPHIC_PRODUCTION = 'photographic-production',
  AUDIOVISUAL_PRODUCTION = 'audiovisual-production',
  GRAPHIC_ARTS_DESIGN = 'graphic-arts-design',
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

export interface BannerImage {
  src: string;
  alt: string;
  backgroundColor?: string;
}

export interface ResponsiveBannerImages {
  desktop: BannerImage[];
  mobile: BannerImage[];
}

export interface ServiceCard {
  id: string;
  title: string;
  subtitle?: string;
  description?: TextContent[];
  list?: ListItem[];
  icon?: string;
  backgroundColor?: string;
  signature?: string;
}

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
  cards?: ServiceCard[];
}

export interface ServiceDetail {
  sections: ServiceSection[];
  bannerImages?: ResponsiveBannerImages;
}

export interface Service {
  key: ServiceKeys;
  title: string;
  image: string;
}

export type ServicesDetails = {
  [key in ServiceKeys]?: ServiceDetail;
}