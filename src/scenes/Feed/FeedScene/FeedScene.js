import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { FeedContainer } from 'AppContainers';
import { SimpleTopNav } from 'AppComponents';
import { styles } from './styles';

export function FeedScene({ hashtag, onBack, routeScene, resetRouteStack }) {
  return (
    <View style={styles.container}>
      {hashtag &&
        <SimpleTopNav
          leftAction={onBack}
          centerLabel={hashtag}
        />
      }
      <FeedContainer
        routeScene={routeScene}
        goToHive={() => resetRouteStack(0)}
      />
    </View>
  );
}

FeedScene.propTypes = {
  hashtag: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  routeScene: PropTypes.func.isRequired,
  resetRouteStack: PropTypes.func.isRequired,
};
