import { Card, Text, useTheme } from 'react-native-paper';
import React from 'react';
import globalStyles from '../../styles/global.styles';
import { BasicCard } from './BasicCard';

interface HistoryCardProps {
  title: string;
  content: string;
}
export const HistoryCard: React.FC<HistoryCardProps> = ({ title, content }) => {
  return (
    <BasicCard roundness={3}>
      <Text variant="labelMedium">{title}</Text>
      <Card.Content style={[globalStyles.removePadding]}>
        <Text variant="bodySmall">{content}</Text>
      </Card.Content>
    </BasicCard>
  );
};
