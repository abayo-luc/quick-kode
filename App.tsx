import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
// import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme, Navigation} from './src';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

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
        {/* <StyledThemeProvider theme={theme}> */}
        <PaperProvider theme={theme}>
          <Navigation theme={theme} />
        </PaperProvider>
        {/* </StyledThemeProvider> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
