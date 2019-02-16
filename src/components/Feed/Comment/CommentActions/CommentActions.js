import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { LabelText } from 'AppFonts';

import { styles } from './styles';

export const CommentActions = ({
  commentVote,
  upvoted,
  downvoted,
  upvoteCount,
  downvoteCount,
}) => {
  const color = (type) => (type ? styles.colorWithType : styles.colorWithoutType);
  const imageStyle = (type) => (
    [styles.voteImage, type && styles.imageTintColor]
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => commentVote('upvote')}>
        <View style={styles.rowTop}>
          <LabelText style={color(upvoted)} fontSize={12}>{upvoteCount}</LabelText>
          <Image source={require('img/icons/icon_fill_up_vote.png')} style={imageStyle(upvoted)} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => commentVote('downvote')}>
        <View style={styles.rowBottom}>
          <LabelText style={color(downvoted)} fontSize={12}>{downvoteCount}</LabelText>
          <Image source={require('img/icons/icon_fill_down_vote.png')} style={imageStyle(downvoted)} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

CommentActions.propTypes = {
  commentVote: PropTypes.func.isRequired,
  upvoted: PropTypes.bool.isRequired,
  downvoted: PropTypes.bool.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
};
