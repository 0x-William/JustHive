/**
 * Created by nick on 24/06/16.
 */
import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { BG_LIGHT_GRAY, BG_DARK_GRAY } from 'AppColors';
import { CONTAINER_DIMS, IMAGE_DIMS } from './constants';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  touchArea: {
    backgroundColor: BG_DARK_GRAY,
    alignSelf: 'stretch',
    opacity: 0.6
  },
  modalViewContainer: {
    position: 'absolute',
    left: 50,
    right: 50,
    top: 100,
    bottom: 100,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: CONTAINER_DIMS - 100,
    height: CONTAINER_DIMS - 100,
    flexDirection: 'column',
  },
  rectRowImage: {
    flex: 1,
    flexDirection: 'row',
  },
  rectImage: {
    flex: 1,
    borderColor: BG_LIGHT_GRAY,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3
  },
  logoStyle: {
    width: 47,
    height: 55
  }
});

const renderImageView = (images, index, width, height) => {
  if (images.length > index) {
    return (
      <Image
        source={{ uri: images[index].url }}
        resizeMode="cover"
        style={{ flex: 1, width, height }}
      />
    );
  }
  return (
    <Image
      source={require('img/icons/icon_logo.png')}
      resizeMode="cover"
      style={styles.logoStyle}
    />
  );
};

const renderImageRow = (images, index, selectImage) => {
  if (images.length > 2) {
    const width = IMAGE_DIMS - 53;
    const height = IMAGE_DIMS - 53;
    if (index === 0) {
      return (
        <View style={styles.rectRowImage}>
          <TouchableOpacity
            style={[styles.rectImage, { borderRightWidth: 0, borderBottomWidth: 0 }]}
            onPress={() => selectImage(false, 0)}
          >
            {renderImageView(images, 0, width, height)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rectImage, { borderBottomWidth: 0 }]}
            onPress={() => selectImage(false, 1)}
          >
            {renderImageView(images, 1, width, height)}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.rectRowImage}>
        <TouchableOpacity
          style={[styles.rectImage, { borderRightWidth: 0 }]}
          onPress={() => selectImage(false, 2)}
        >
          {renderImageView(images, 2, width, height)}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rectImage}
          onPress={() => selectImage(false, 3)}
        >
          {renderImageView(images, 3, width, height)}
        </TouchableOpacity>
      </View>
    );
  } else if (images.length === 2 && index === 0) {
    const width = IMAGE_DIMS - 53;
    const height = CONTAINER_DIMS - 103;
    return (
      <View style={styles.rectRowImage}>
        <TouchableOpacity
          style={[styles.rectImage, { borderRightWidth: 0 }]}
          onPress={() => selectImage(false, 0)}
        >
          {renderImageView(images, 0, width, height)}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rectImage}
          onPress={() => selectImage(false, 1)}
        >
          {renderImageView(images, 1, width, height)}
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export function CommentSelectImage({ images, selectImage }) {
  return (
    <Modal transparent={true}>
      <View style={[styles.absolute, styles.touchArea]} />
      <View style={styles.modalViewContainer}>
        <TouchableOpacity onPress={() => selectImage(false, -1)} style={styles.absolute} />
        <View style={styles.imageContainer}>
          {renderImageRow(images, 0, selectImage)}
          {renderImageRow(images, 1, selectImage)}
        </View>
      </View>
    </Modal>
  );
}

CommentSelectImage.propTypes = {
  images: PropTypes.array.isRequired,
  selectImage: PropTypes.func.isRequired,
};
