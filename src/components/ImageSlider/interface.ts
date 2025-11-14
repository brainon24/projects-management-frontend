export interface SlideImage {
  src: string;
  alt?: string;
  backgroundColor?: string;
}

export interface ImageSliderProps {
  images: SlideImage[];
  autoplayDelay?: number;
  showDesktopOnly?: boolean;
  showMobileOnly?: boolean;
  className?: string;
}