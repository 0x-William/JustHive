import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HexagonGrid } from '../';
import { BG_DARK_GRAY, WHITE, YELLOW } from '../../../colors';
import range from 'lodash/range';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_DARK_GRAY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default function GridWithPlaceholdersExample() {
  return (
    <View style={styles.container}>
      <HexagonGrid
        width={300}
        height={500}
        spacing={5}
        hexagons={[
          {
            type: 'icon',
            icon: 'thumb-up',
            color: YELLOW,
          },
          ...range(36).map(() => ({ color: WHITE, opacity: 0.05 })),
          ...range(24).map(() => ({ color: YELLOW, opacity: 0.15 })),
        ]}
        hexagonSize={30}
      />
    </View>
  );
}
