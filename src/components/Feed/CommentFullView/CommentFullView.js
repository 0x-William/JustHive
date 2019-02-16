/**
 * Created by nick on 14/06/16.
 */
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { CommentText, LabelText } from 'AppFonts';
import { Close } from 'AppComponents';
import { styles } from './styles';

export class CommentFullView extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    comment: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.onClose = ::this.onClose;
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    const { title, subtitle, comment } = this.props;
    return (
      <Modal transparent={true}>
        <View style={styles.container} >
          <TouchableOpacity
            onPress={this.onClose}
            style={ styles.touchable }
          />
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.rowView}>
            <View style={styles.columnView}>
              <LabelText style={styles.title} fontSize={20}>{title}</LabelText>
              <LabelText style={styles.subtitle} fontSize={15}>{subtitle}</LabelText>
            </View>
            <View style={ styles.closeView }>
              <Close close={this.onClose} style={ styles.close } />
            </View>
          </View>
          <CommentText maxLine={15}>
            {comment}
          </CommentText>
        </View>
      </Modal>
    );
  }
}
