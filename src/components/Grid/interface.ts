export interface GridItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  icon?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export interface GridSectionProps {
  title?: string;
  subtitle?: string;
  items: GridItem[];
  variant?: 'services' | 'about' | 'clients';
  className?: string;
  itemClassName?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}