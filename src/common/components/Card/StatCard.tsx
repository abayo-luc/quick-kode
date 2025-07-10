import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { DEVICE_DIMENSIONS } from '../constants';
import { BasicCard } from './BasicCard';

interface StatCardProps {
  title: string;
  value: string | number;
}

const styles = StyleSheet.create({
  container: {
    minWidth: DEVICE_DIMENSIONS.width * 0.35,
  },
});

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <BasicCard style={styles.container} roundness={4}>
      <Text variant="labelSmall">{title}</Text>
      <Text variant="headlineSmall">{value}</Text>
    </BasicCard>
  );
};
