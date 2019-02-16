import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Login, WelcomeBanner } from 'AppComponents';
import { AlertMessage } from 'AppUtilities';
import { styles } from '../styles';

export function LoginContainer({ feathers, routeSignup, routeForgotPassword, routeLoginSuccess }) {
  const logUserIn = (result) => {
    const user = { token: result.token, ...result.data };
    return routeLoginSuccess(user);
  };

  const handleLogin = (data) => {
    const { username, password } = data;
    return feathers.authenticate({
      type: 'local',
      username,
      password
    })
    .then(logUserIn)
    .catch(err => AlertMessage.fromRequest(err));
  };

  return (
    <View style={styles.container}>
      <WelcomeBanner />
      <Login
        handleLogin={handleLogin}
        routeForgotPassword={routeForgotPassword}
        routeSignup={routeSignup}
      />
    </View>
  );
}

LoginContainer.propTypes = {
  feathers: PropTypes.object.isRequired,
  routeSignup: PropTypes.func.isRequired,
  routeForgotPassword: PropTypes.func.isRequired,
  routeLoginSuccess: PropTypes.func.isRequired
};
