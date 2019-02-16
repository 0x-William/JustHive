import React, { PropTypes } from 'react';
import { TextInput } from 'react-native';
import { VALIDATIONS } from 'AppConstants';
import { Form } from 'AppComponents';
import { ProfileButton } from 'AppButtons';
import { styles } from './styles';

export function ProfileEditForm({
  name,
  location,
  bio,
  submitting,
  onSubmit,
}) {
  return (
    <Form
      fields={[
        {
          label: 'Name',
          name: 'name',
          input: <TextInput autoCapitalize="words" autoFocus={true} />,
          validations: [
            VALIDATIONS.required(),
          ],
        },
        {
          label: 'Location',
          name: 'location',
          input: <TextInput autoCapitalize="words" />,
        },
        {
          label: 'Bio',
          name: 'bio',
          input: <TextInput multiline={true} numberOfLines={3} />,
        },
      ]}
      initialValues={{ name, location, bio }}
      submitting={submitting}
      renderFooter={({ submit }) => (
        <ProfileButton
          label="Save Changes"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={submit}
        />
      )}
      style={styles.form}
      onSubmit={onSubmit}
    />
  );
}

ProfileEditForm.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  bio: PropTypes.string,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};
