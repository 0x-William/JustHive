import React, { Component, PropTypes } from 'react';
import { WebView, Modal, StyleSheet } from 'react-native';
import { WSOCKET } from 'AppConfig';

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 20
  }
});

export class FacebookModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.authUrl = `${WSOCKET}/auth/facebook`;
  }

  render() {
    const { isVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={isVisible}
      >
        { isVisible && <WebView
          source={{ uri: this.authUrl }}
          style={ styles.topMargin }
        />}
      </Modal>
    );
  }
}
