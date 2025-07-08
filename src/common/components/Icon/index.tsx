import React from 'react';
import {icons} from '../../../assets/icons';
import {useTheme} from 'react-native-paper';

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  ...props
}) => {
  const theme = useTheme();
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={size}
      width={size}
      fill={color || theme.colors.onPrimary}
      {...props}
    />
  );
};
