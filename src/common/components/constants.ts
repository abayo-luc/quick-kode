import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const DEVICE_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375, // Example threshold for small devices
  isLargeDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768, // Example threshold for large devices
  isTablet: SCREEN_WIDTH >= 768, // Example threshold for tablets
};
