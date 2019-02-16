import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

export const PostBottomNav = ({
  addImage,
  routeEditPost,
  createPost
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={addImage}>
      <Icon name="cancel" style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={routeEditPost}>
      <Icon name="wb-sunny" style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={createPost}>
      <Icon name="text-format" style={[styles.icon, styles.primary]} />
    </TouchableOpacity>
  </View>
);

PostBottomNav.propTypes = {
  addImage: PropTypes.func,
  routeEditPost: PropTypes.func,
  createPost: PropTypes.func,
};
