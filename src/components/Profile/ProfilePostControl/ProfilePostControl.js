import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

export function ProfilePostControl({ setFeedStyle, postCount }) {
  const numPosts = `${postCount} posts`;
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setFeedStyle('tile')}>
          <Image source={require('img/icons/icon_profile_grid.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFeedStyle('list')}>
          <Image
            source={require('img/icons/icon_profile_list.png')}
            style={[styles.icon, styles.iconWide]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFeedStyle('360')}>
          <Image source={require('img/icons/icon_profile_360.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <LabelText upperCase={true}>{numPosts}</LabelText>
      </View>
    </View>
  );
}

ProfilePostControl.propTypes = {
  setFeedStyle: PropTypes.func.isRequired,
  postCount: PropTypes.number.isRequired,
};
