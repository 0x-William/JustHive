import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heatmap } from '../';
import { BG_DARK_GRAY, WHITE, YELLOW } from '../../../colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_DARK_GRAY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heatmap: {
    borderWidth: 2,
    borderColor: 'black'
  }
});

export default function HeatmapWithImage() {
  return (
    <View style={styles.container}>
      <Heatmap
        imageSource={{ uri: 'http://imguol.com/blogs/136/files/2016/03/batsuper.jpg' }}
        width={900 * .35}
        height={563 * .35}
        data={[
          { x: 10, y: 15, value: 5, radius: 100 },
          { x: 50, y: 50, value: 1 },
          { x: 180, y: 180, value: 4, radius: 50 },
          { x: 180, y: 225, value: 2 },
          { x: 200, y: 200, value: 3, radius: 40 },
          { x: 60, y: 200, value: 3 },
          { x: 80, y: 200, value: 1, radius: 30 },
          { x: 100, y: 200, value: 2 },
        ]}
        style={styles.heatmap}
        onPress={(x, y) => console.warn(x, y)}
      />
    </View>
  );
}
