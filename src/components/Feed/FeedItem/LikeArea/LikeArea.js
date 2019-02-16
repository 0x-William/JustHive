import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { YELLOW, AUX_TEXT } from 'AppColors';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

export const LikeArea = ({
  voted,
  votedImage,
  votePost,
  routeComments,
  share,
  voteCount,
  commentCount,
  expireText
}) => {
  const color = voted ? YELLOW : AUX_TEXT;
  const tintStyle = voted && { tintColor: YELLOW };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={votePost}>
        <Image source={require('img/icons/icon_fill_up_vote.png')} style={[styles.voteIcon, tintStyle]} />
        {votedImage && <LabelText style={[styles.label, { color }]}>{voteCount}</LabelText>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={routeComments}>
        <Image source={require('img/icons/icon_comment_placeholder.png')} style={styles.commentIcon} />
        {votedImage && <LabelText style={styles.label}>{commentCount}</LabelText>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={share}>
        <Image source={require('img/icons/icon_share.png')} style={styles.shareIcon} />
      </TouchableOpacity>
      <View style={styles.expires}>
        <Image source={require('img/icons/icon_count_down.png')} style={styles.countIcon} />
        <LabelText style={styles.expireText} fontSize={12}>{expireText}</LabelText>
      </View>
    </View>
  );
};

LikeArea.propTypes = {
  voted: PropTypes.bool.isRequired,
  votedImage: PropTypes.bool.isRequired,
  votePost: PropTypes.func.isRequired,
  routeComments: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  voteCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  expireText: PropTypes.string,
};
