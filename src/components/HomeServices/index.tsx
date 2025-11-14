import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { Grid } from '../Grid';
import { GridItem } from '../Grid/interface';

export const HomeServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceKey: string) => {
    navigate(`/service/${serviceKey}`);
  };

  const serviceItems: GridItem[] = services.map((service) => ({
    id: service.key,
    title: service.title,
    image: service.image,
    onClick: () => handleServiceClick(service.key)
  }));

  return (
    <Grid 
      items={serviceItems}
      variant="services"
        style={{
            padding: '0',
            margin: 0
        }}
    />
  );
}
