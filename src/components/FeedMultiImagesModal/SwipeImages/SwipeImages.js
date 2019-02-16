import React, { PropTypes } from 'react';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import { FullImageView } from './FullImageView';

export function SwipeImages({ images, pageIndex, onSwipe, voteImage }) {
  const swipeViews = _.map(images,
    (image, index) =>
      <FullImageView key={index} image={image} voteImage={voteImage} />
  );
  return (
    <Swiper
      showsPagination={false}
      index={pageIndex}
      onMomentumScrollEnd={(e, state) => onSwipe(images[state.index])}
    >
      {swipeViews}
    </Swiper>
  );
}

SwipeImages.propTypes = {
  images: PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  onSwipe: PropTypes.func.isRequired,
  voteImage: PropTypes.func.isRequired,
};
