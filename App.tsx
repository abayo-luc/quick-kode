import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme, Navigation } from './src';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />

        <PaperProvider theme={theme}>
          <GestureHandlerRootView
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <BottomSheetModalProvider>
              <Navigation theme={theme} />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
