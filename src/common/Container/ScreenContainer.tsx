import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ThemeSpacings} from '../../config/theme';
import globalStyles from '../styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ThemeSpacings.md,
    ...globalStyles.column,
    gap: ThemeSpacings.md,
  },
});

interface ScreenContainerProps {
  children: React.ReactNode;
}
export const ScreenContainer: React.FC<ScreenContainerProps> = ({children}) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {children}
    </View>
  );
};
