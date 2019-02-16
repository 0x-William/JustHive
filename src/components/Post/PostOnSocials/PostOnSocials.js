import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { SocialList } from 'AppComponents';
import { LabelText } from 'AppFonts';

export const PostOnSocials = ({ onPress }) => (
  <View style={styles.container}>
    <LabelText style={styles.title} fontSize={13} >
      POST ON OTHER SOCIAL NETWORKS
    </LabelText>
    <SocialList
      onPress={onPress}
      style={ styles.socialList }
    />
  </View>
);

PostOnSocials.propTypes = {
  onPress: PropTypes.func.isRequired
};
