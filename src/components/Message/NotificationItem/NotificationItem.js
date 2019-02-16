import React, { PropTypes } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, Image } from 'react-native';
import { HexagonImage } from 'AppComponents';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

const renderPostImage = (images, index, width, height) => {
  if (images.length > index) {
    return (
      <Image
        source={{ uri: images[index].url }}
        resizeMode="cover"
        style={{ width, height }}
      />
    );
  }
  return (
    <View style={[styles.logoImageContainer, { width, height }]}>
      <Image
        source={require('img/icons/icon_logo.png')}
        resizeMode="cover"
        style={ styles.iconLogo }
      />
    </View>
  );
};

const renderPostImageRow = (images, index) => {
  const width = 44;
  const height = 44;
  const imageCount = images.length;
  if (imageCount === 1 && index === 0) {
    return renderPostImage(images, 0, width, height);
  } else if (imageCount === 2 && index === 0) {
    return (
      <View style={ styles.postImageView }>
        {renderPostImage(images, 0, width / 2, height)}
        <View style={{ width: 1 / 2, height, backgroundColor: '#FEFEFE' }} />
        {renderPostImage(images, 1, width / 2, height)}
      </View>
    );
  }
  if (images.length > 2) {
    return (
      <View style={ styles.postImageView }>
        {renderPostImage(images, index * 2, width / 2, height / 2)}
        <View style={{ width: 1 / 2, height, backgroundColor: '#FEFEFE' }} />
        {renderPostImage(images, index * 2 + 1, width / 2, height / 2)}
      </View>
    );
  }
  return null;
};

const renderImage = (notification, routeNotification) => {
  const { target } = notification;
  if (target === 'post' || target === 'comment' || target === 'reply') {
    const { images } = notification.post;
    return (
      <TouchableOpacity style={styles.imageContainer} onPress={routeNotification}>
        {renderPostImageRow(images, 0)}
        {renderPostImageRow(images, 1)}
      </TouchableOpacity>
    );
  }
  return null;
};

export const NotificationItem = ({
  notification,
  updatedAt,
  routeNotification,
}) => {
  const { type, createdBy } = notification;
  const avatar = { uri: createdBy.avatarUrl };
  let message = '';
  if (type === 'share') {
    message = `${createdBy.name} shared post to you.`;
  } else if (type === 'post_vote') {
    message = `${createdBy.name} vote your post.`;
  } else if (type === 'image_vote') {
    message = `${createdBy.name} vote image on your post.`;
  } else if (type === 'comment_vote_up') {
    message = `${createdBy.name} vote up your comment.`;
  } else if (type === 'comment_vote_down') {
    message = `${createdBy.name} vote down your comment.`;
  } else if (type === 'reply_vote_up') {
    message = `${createdBy.name} vote up your reply.`;
  } else if (type === 'reply_vote_down') {
    message = `${createdBy.name} vote down your reply.`;
  } else if (type === 'comment') {
    message = `${createdBy.name} comment your post.`;
  } else if (type === 'reply') {
    message = `${createdBy.name} reply your comment.`;
  } else if (type === 'following') {
    message = `${createdBy.name} is following you now`;
  }
  return (
    <TouchableWithoutFeedback
      onPress={routeNotification}
      style={[styles.container, styles.row]}
    >
      <View style={[styles.container, styles.row]}>
        <View style={[styles.container, styles.row, { flex: 1 }]}>
          <View style={[styles.container, styles.row, styles.notificationContainer]}>
            <TouchableOpacity>
              <HexagonImage
                imageWidth={45}
                imageHeight={45}
                border={true}
                isHorizontal={true}
                size={40}
                imageSource={avatar}
              />
            </TouchableOpacity>
            <View style={[styles.wrap, styles.row]}>
              <View style={ styles.messageView }>
                <View style={[styles.row, { flex: 1 }]}>
                  <LabelText style={styles.participants} fontSize={14}>
                    {message}
                  </LabelText>
                </View>
                <View style={[styles.row, { marginTop: 3 }]}>
                  <View style={ styles.updatedAtView }>
                    <LabelText style={styles.updatedAt}>
                      {updatedAt}
                    </LabelText>
                  </View>
                </View>
              </View>
              {renderImage(notification, routeNotification)}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

NotificationItem.propTypes = {
  updatedAt: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
  routeNotification: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
};
