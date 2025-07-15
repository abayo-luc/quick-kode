import React from 'react';
import { Card, CardProps, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { DEVICE_DIMENSIONS } from '../constants';
import { BasicCard } from './BasicCard';
import globalStyles from '../../styles/global.styles';
import { ThemeSpacings } from '../../../config/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  style?: CardProps['style'];
}

const styles = StyleSheet.create({
  container: {
    minWidth: DEVICE_DIMENSIONS.width / 2 - ThemeSpacings.md * 2,
  },
});

export const StatCard: React.FC<StatCardProps> = ({ title, value, style }) => {
  return (
    <BasicCard style={[styles.container, style]} roundness={4}>
      <Card.Content style={[globalStyles.removePadding]}>
        <Text variant="labelSmall">{title}</Text>
        <Text variant="headlineSmall">{value}</Text>
      </Card.Content>
    </BasicCard>
  );
};
