import {MD3LightTheme, MD3DarkTheme, MD3Theme} from 'react-native-paper';
export * from './theme.utils';
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(13,89,49)', // Green for primary actions (buttons, highlights)
    primaryContainer: 'rgb(239,247,242)',
    onPrimary: '#FFFFFF', // White text/icons on primary background
    secondary: '#B7D4F0', // Blue for Balance highlights
    onSecondary: '#000000', // Black text/icons on secondary background
    tertiary: '#F6CCCC', // Pink for Debits highlights
    onTertiary: '#000000', // Black text/icons on tertiary background
    background: '#F8F9FA', // Light gray background
    onBackground: '#000000', // Black text/icons on light gray background
    error: '#D32F2F', // Standard error color
    onError: '#FFFFFF', // White text/icons on error background
    outline: '#E0E0E0', // Subtle gray for borders and lines

    surfaceVariant: '#FFFFFF',
    surface: '#FFFFFF', // White card background
    onSurface: '#000000', // Black text on cards
  },
  roundness: 4, // Rounded corners for cards and buttons
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(13,89,49)', // Same green for primary actions
    primaryContainer: 'rgb(239,247,242)',
    onPrimary: '#FFFFFF', // White text/icons on primary background
    secondary: '#B7D4F0', // Blue for Balance highlights
    onSecondary: '#000000', // Black text/icons on secondary background
    tertiary: '#F6CCCC', // Pink for Debits highlights
    onTertiary: '#000000', // Black text/icons on tertiary background
    background: '#121212', // Dark gray background
    onBackground: '#FFFFFF', // White text/icons on dark background

    error: '#CF6679', // Muted red for errors
    onError: '#000000', // Black text/icons on error background
    outline: '#3C3C3C', // Dark gray for borders and lines

    surfaceVariant: '#000000',
    surface: '#000000', // Black card background
    onSurface: '#FFFFFF', // White text on cards
  },
  roundness: 4, // Rounded corners for cards and buttons
};
