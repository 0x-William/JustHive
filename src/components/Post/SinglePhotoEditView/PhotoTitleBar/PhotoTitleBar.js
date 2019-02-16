import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AutoGrowInput } from 'AppComponents';
import { YELLOW, GRAY, AUX_TEXT } from 'AppColors';
import { styles } from './styles';

export function PhotoTitleBar({
  onChangeTitle,
  onChangeHeight,
  title,
  height,
  placeholder,
  setActiveInput,
  activeInput
}) {
  return (
    <View style={[styles.container, { height }]}>
    <TouchableOpacity onPress={() => setActiveInput('people')}>
      <Image
        source={require('img/icons/icon_fill_profile.png')}
        style={[styles.iconUser, {
          tintColor: activeInput === 'people' || activeInput === 'tag'
          ? YELLOW : GRAY
        }]}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveInput('location')}>
      <Image
        source={require('img/icons/icon_location.png')}
        style={[styles.imgLocation, { tintColor: activeInput === 'location' ? YELLOW : AUX_TEXT }]}
      />
    </TouchableOpacity>
      <AutoGrowInput
        minHeight={40}
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder={placeholder}
        onChangeHeight={onChangeHeight}
      />
    </View>
  );
}

PhotoTitleBar.propTypes = {
  onChangeTitle: PropTypes.func.isRequired,
  onChangeHeight: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  activeInput: PropTypes.string.isRequired,
  setActiveInput: PropTypes.func.isRequired
};
