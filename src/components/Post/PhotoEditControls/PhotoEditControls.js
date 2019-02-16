import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BG_MEDIUM_GRAY, YELLOW, WHITE } from 'AppColors';
import { styles } from './styles';

export const PhotoEditControls = ({
  toggleIcon,
  activeFilter,
  photoEditView,
  navPost
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => photoEditView && toggleIcon('imageFilter')}>
      <Image
        source={require('img/icons/icon_filter_image.png')}
        style={[styles.iconFilterImage,
         { tintColor: activeFilter === 'imageFilter' ? YELLOW : BG_MEDIUM_GRAY }
        ]}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={navPost}>
      <Image
        source={require('img/icons/icon_nav_post.png')}
        style={[styles.iconPost, { tintColor: WHITE }]}
      />
    </TouchableOpacity>
    {
      photoEditView ?
        <TouchableOpacity onPress={() => toggleIcon('textFilter')}>
          <Image
            source={require('img/icons/icon_filter_text.png')}
            style={[styles.iconFilterText,
             { tintColor: activeFilter === 'textFilter' ? YELLOW : BG_MEDIUM_GRAY }
            ]}
          />
        </TouchableOpacity>
        :
        <TouchableOpacity>
          <View>
            <Image
              source={require('img/icons/icon_image_layout.png')}
              style={styles.iconImageLayout}
            />
          </View>
        </TouchableOpacity>
    }
  </View>
);

PhotoEditControls.propTypes = {
  navPost: PropTypes.func.isRequired,
  toggleIcon: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  photoEditView: PropTypes.bool.isRequired
};
