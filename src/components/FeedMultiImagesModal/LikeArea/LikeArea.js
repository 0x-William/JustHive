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
  votePost,
  routeComments,
  share,
  voteCount,
  commentCount,
  createdAgo
}) => {
  const color = voted ? YELLOW : AUX_TEXT;
  const tintStyle = voted && { tintColor: YELLOW };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={votePost}>
        <Image source={require('img/icons/icon_up_vote.png')} style={[styles.voteIcon, tintStyle]} />
        {voted && <LabelText style={[styles.label, { color }]}>{voteCount}</LabelText>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={routeComments}>
        <Image source={require('img/icons/icon_comment_placeholder.png')} style={styles.commentIcon} />
        <LabelText style={styles.label}>{commentCount}</LabelText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={share}>
        <Image source={require('img/icons/icon_share.png')} style={styles.shareIcon} />
      </TouchableOpacity>
      <View style={styles.expires}>
        <LabelText style={styles.expireText}>{createdAgo.toUpperCase()}</LabelText>
      </View>
    </View>
  );
};

LikeArea.propTypes = {
  votePost: PropTypes.func.isRequired,
  routeComments: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  voteCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  createdAgo: PropTypes.string,
  voted: PropTypes.bool.isRequired,
};
