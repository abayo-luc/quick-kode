import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { Icon } from '../Icon';
import { StyleSheet } from 'react-native';
import { DEVICE_DIMENSIONS } from '../constants';

interface StatCardProps {
  title: string;
  value: string | number;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    minWidth: DEVICE_DIMENSIONS.width * 0.35,
  },
  contentStyle: {},
});

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <Card
      contentStyle={styles.container}
      style={styles.contentStyle}
      mode="elevated"
      theme={{
        roundness: 2,
      }}
    >
      <Text variant="labelSmall">{title}</Text>
      <Text variant="headlineSmall">{value}</Text>
    </Card>
  );
};
