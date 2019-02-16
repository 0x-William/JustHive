import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { GrayHeader, AuxText, LabelText } from 'AppFonts';
import { UserAvatar } from 'AppComponents';
import { styles } from './styles';

export const ProfileInfo = ({
  _id,
  avatarUrl,
  name,
  bio,
  location,
  followingCount,
  followerCount,
  routeScene,
}) => (
  <View style={styles.container}>
    <View style={[styles.row, styles.marginBottom, styles.mainRow]}>
      <UserAvatar avatarUrl={avatarUrl} />
      <View>
        <GrayHeader style={styles.center}>{name}</GrayHeader>
        <AuxText
          style={[styles.center, styles.marginBottom]}
          upperCase={false}
        >
          {location.city}, {location.state}
        </AuxText>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => routeScene('FollowerScene', { userId: _id, followers: true })}
            style={[styles.box, styles.boxLeft]}
          >
            <LabelText>{followerCount}</LabelText>
            <LabelText upperCase={true}>Followers</LabelText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => routeScene('FollowerScene', { userId: _id, followers: false })}
            style={[styles.box, styles.boxRight]}
          >
            <LabelText>{followingCount}</LabelText>
            <LabelText upperCase={true}>Following</LabelText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <LabelText
      style={[styles.bio, styles.marginBottom, !bio ? styles.center : null]}
      numberOfLines={0}
    >
      {bio || 'You can create a bio by editing your profile.'}
    </LabelText>
  </View>
);

ProfileInfo.propTypes = {
  _id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.any,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  location: PropTypes.object,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  routeScene: PropTypes.func.isRequired,
};
