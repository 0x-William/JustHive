import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { HexagonImage } from 'AppComponents';
import { styles } from './styles';
import { LabelText } from 'AppFonts';
export const ThreadUserRow = ({ user, handlePress }) => (
  <TouchableOpacity onPress={handlePress} style={styles.container}>
    <HexagonImage
      imageWidth={45}
      imageHeight={45}
      border={true}
      isHorizontal={true}
      size={40}
      imageSource={{ uri: user.avatarUrl }}
    />
    <LabelText style={styles.text}>
      {user.name}
    </LabelText>
  </TouchableOpacity>
);

ThreadUserRow.propTypes = {
  user: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
};
