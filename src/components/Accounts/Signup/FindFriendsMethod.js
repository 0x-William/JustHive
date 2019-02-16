import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { LIGHT_TEXT } from 'AppColors';
import { styles } from '../styles';

export function FindFriendsMethod({ searchContacts, connectToFacebook, skipToNext }) {
  return (
    <View style={styles.container}>
      <View style={styles.space} />
      <AuxText upperCase={false} style={styles.containerLabel}>
        Find Your Friends
      </AuxText>
      <AuxText upperCase={false}>
        See which your friends are already on Wonderbee
      </AuxText>
      <AuxText upperCase={false} style={styles.space}>
        and choose who to follow.
      </AuxText>
      <View style={styles.space} />
      <ActionButton
        label="SEARCH YOUR CONTACTS"
        isActive={true}
        onPress={searchContacts}
        labelStyle={styles.lightText}
        style={styles.space}
      />
      <AuxText style={styles.space}>OR</AuxText>
      <ActionButton
        label={
          <View style={[styles.row, styles.alignMiddle]}>
            <Icon name="facebook-official" size={20} color={LIGHT_TEXT} style={styles.icon} />
            <AuxText upperCase={false} style={styles.lightText}> CONNECT TO FACEBOOK</AuxText>
          </View>
        }
        isActive={true}
        onPress={connectToFacebook}
        labelStyle={styles.lightText}
      />
      <AuxText upperCase={false} style={[styles.space, styles.innerSpacing, styles.noteLabel]}>
        We will never post to Facebook without your permission.
      </AuxText>
      <View style={styles.bottomContainer}>
        <ActionButton
          label="SKIP"
          isActive={true}
          showActiveBorder={false}
          onPress={skipToNext}
          labelStyle={styles.lightText}
        />
      </View>
    </View>
  );
}

FindFriendsMethod.propTypes = {
  searchContacts: PropTypes.func,
  connectToFacebook: PropTypes.func,
  skipToNext: PropTypes.func,
};
