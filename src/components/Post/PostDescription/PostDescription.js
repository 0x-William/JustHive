import React, { PropTypes } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

export const PostDescription = ({
  images,
  type,
  description,
  onDescriptionChange
}) => (
  <View style={styles.postDetails}>
    <View>
      <Image
        source={{ uri: images[0] }}
        style={styles.postImage}
        resizeMode="cover"
      />
        <TouchableOpacity>
          <View style={styles.typeContainer}>
            <LabelText style={styles.type} fontSize={16}>{type.toUpperCase()}</LabelText>
            <Image source={require('img/icons/icon_edit.png')} style={styles.iconEdit} />
          </View>
        </TouchableOpacity>
    </View>
    <TextInput
      style={styles.description}
      multiline={true}
      placeholder="Type description"
      value={description}
      onChangeText={onDescriptionChange}
    />
  </View>
);

PostDescription.propTypes = {
  images: PropTypes.array,
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  type: PropTypes.string
};
