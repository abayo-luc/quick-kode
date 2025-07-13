import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Card, CardProps, useTheme } from 'react-native-paper';
import { ThemeSpacings } from '../../../config/theme';
import React from 'react';

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingHorizontal: ThemeSpacings.md,
    paddingVertical: ThemeSpacings.md,
    gap: ThemeSpacings.sm,
  },
});

interface BasicCardProps {
  children?: React.ReactNode;
  roundness?: number;
  contentStyle?: StyleProp<ViewStyle>;
  style?: CardProps['style'];
}
export const BasicCard: React.FC<BasicCardProps> = ({
  children,
  roundness,
  contentStyle,
  style,
}) => {
  const theme = useTheme();
  return (
    <Card
      style={[styles.container, style]}
      contentStyle={[
        styles.content,
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: roundness || theme.roundness,
        },
        contentStyle,
      ]}
      mode="outlined"
    >
      {children}
    </Card>
  );
};
