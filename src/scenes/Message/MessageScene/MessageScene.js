import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { MessageContainer } from 'AppContainers';
import { SimpleTopNav } from 'AppComponents';
import { styles } from './styles';
import { PRIMARY_TEXT, LIGHT_TEXT } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class MessageScene extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    threadId: PropTypes.string.isRequired,
    involved: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.getName = ::this.getName;
  }

  getName() {
    const { involved } = this.props;
    return involved.length > 1 ? 'Group' : involved[0].name;
  }

  render() {
    const name = this.getName().toUpperCase();
    return (
      <View style={styles.container}>
        <SimpleTopNav
          leftLabel={<Icon name="keyboard-arrow-left" size={40} color={LIGHT_TEXT} />}
          rightLabel={<View style={styles.rightLabel} />}
          leftAction={this.props.onBack}
          centerLabel={name}
          backgroundColor={PRIMARY_TEXT}
          color={LIGHT_TEXT}
          centerFontSize={15}
        />
        <MessageContainer
          threadId={this.props.threadId}
          involved={this.props.involved}
          routeBack={this.props.onBack}
          routeScene={this.props.routeScene}
        />
      </View>
    );
  }
}
