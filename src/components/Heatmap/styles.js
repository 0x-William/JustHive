import { StyleSheet } from 'react-native';

export function getStyles({ width, height }) {
  return StyleSheet.create({
    container: {
      position: 'relative',
      width,
      height,
    },
    image: {
      width,
      height,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    webView: {
      backgroundColor: 'transparent',
      width,
      height,
      position: 'absolute',
      top: 0,
      left: 0,
    }
  });
}
