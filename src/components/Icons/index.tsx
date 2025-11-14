import React from 'react';
import IcoMoon from 'react-icomoon';
import iconsSet from './icons.json';
import type { IconProps } from './interface';

export const Icon: React.FC<IconProps> = ({
  name = 'bank',
  size = 16,
  color = '#000',
}) => (
  <IcoMoon
    native
    iconSet={iconsSet}
    size={size}
    color={color}
    icon={name}
    disableFill={true}
  />
);