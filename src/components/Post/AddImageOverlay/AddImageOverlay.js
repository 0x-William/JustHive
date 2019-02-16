/**
 * Created by nick on 19/07/16.
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { WHITE } from 'AppColors';
import { ActionButton } from 'AppButtons';

const buttons = [
  {
    type: 'library',
    label: 'PHOTO LIBRARY',
    icon: require('img/icons/icon_camera_roll.png'),
    style: { width: 30, height: 25, tintColor: WHITE }
  },
  {
    type: 'camera',
    label: 'CAMERA',
    icon: require('img/icons/icon_camera.png'),
    style: { width: 30, height: 25, tintColor: WHITE }
  },
  {
    type: 'cancel',
    label: 'CANCEL',
    icon: false
  }
];

export class AddImageOverlay extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddImage: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      pressed: ''
    };
    this.btnActions = [
      () => props.onAddImage('roll'),
      () => props.onAddImage('camera'),
      props.onClose,
    ];
  }
  changeStyle(pressed) {
    this.setState({ pressed });
  }

  renderButton(button, action) {
    const { pressed } = this.state;
    return (
      <ActionButton
        onPressIn={() => this.changeStyle(button.type)}
        onPress={action}
        showActiveBorder={true}
        style={[styles.button, pressed === button.type && styles.pressed]}
        label={button.label}
        icon={button.icon}
        iconStyle={button.style}
        labelStyle={styles.buttonText}
      />
    );
  }
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.btnActions[2]}>
        <View style={styles.row} />
        <View style={styles.row} >
          {this.renderButton(buttons[0], this.btnActions[0])}
          {this.renderButton(buttons[1], this.btnActions[1])}
        </View>
        <View style={styles.row}>
          {this.renderButton(buttons[2], this.btnActions[2])}
        </View>
      </TouchableOpacity>
    );
  }
}
