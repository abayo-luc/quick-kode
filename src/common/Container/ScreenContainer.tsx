import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
