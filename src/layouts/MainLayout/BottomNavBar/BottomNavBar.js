import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { WHITE, YELLOW } from 'AppColors';

export function BottomNavBar({
  routeFeed,
  routeProfile,
  routePost,
  routeThread,
  routeSearch,
  activeScene
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={routeFeed} style={styles.button}>
        <Image
          source={require('img/icons/icon_nav_feed.png')}
          style={ activeScene === 'FeedScene' ? styles.iconNavFeedActive : styles.iconNavFeed }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={routeProfile} style={styles.button}>
        <Image
          source={require('img/icons/icon_profile.png')}
          style={ activeScene === 'ProfileScene' ? styles.iconProfileActive : styles.iconProfile }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={routePost} style={styles.button}>
        <Image
          source={require('img/icons/icon_nav_post.png')}
          style={ styles.iconNavPost }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={routeThread} style={styles.button}>
        <Image
          source={require('img/icons/icon_nav_message.png')}
          style={ activeScene === 'ThreadScene' ? styles.iconMessageActive : styles.iconMessage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={routeSearch} style={styles.button}>
        <Image
          source={require('img/icons/icon_nav_hive.png')}
          style={ activeScene === 'SearchScene' ? styles.iconSearchActive : styles.iconSearch}
        />
      </TouchableOpacity>
    </View>
  );
}

BottomNavBar.propTypes = {
  routeFeed: PropTypes.func.isRequired,
  routeProfile: PropTypes.func.isRequired,
  routePost: PropTypes.func.isRequired,
  routeThread: PropTypes.func.isRequired,
  routeSearch: PropTypes.func.isRequired,
  activeScene: PropTypes.string.isRequired,
};
