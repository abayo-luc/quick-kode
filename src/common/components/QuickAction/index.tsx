import React from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import {Icon, IconProps} from '../Icon';

interface QuickActionProps extends ButtonProps {
  icon?: IconProps['name'];
}
export const QuickAction: React.FC<QuickActionProps> = ({
  children,
  ...props
}) => {
  const renderIcon = () => {
    if (props.icon) {
      return <Icon name={props.icon} size={20} />;
    }
    return null;
  };
  return (
    <Button mode="contained" {...props} icon={renderIcon}>
      {children}
    </Button>
  );
};
