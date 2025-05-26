import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';
import { wrapWithReanimatedMetroConfig } from 'react-native-reanimated/metro-config';
import path from 'path';

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [path.resolve(__dirname, 'src')],
  transformer: {
    babelTransformerPath: require.resolve(
      "react-native-svg-transformer"
    )
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
};

export default mergeConfig(getDefaultConfig(__dirname), wrapWithReanimatedMetroConfig(config));
