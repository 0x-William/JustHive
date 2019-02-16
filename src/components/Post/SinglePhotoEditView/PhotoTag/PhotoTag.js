import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Triangle from 'react-native-triangle';

// @TODO component's render need to be optimized
export class PhotoTag extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    icon: PropTypes.string,
    size: PropTypes.number,
    style: View.propTypes.style,
    withTriangle: PropTypes.bool.isRequired
  }
  static defaultProps = {
    icon: 'highlight-off',
    size: 20,
    withTriangle: false
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      contentWidth: 0
    };
    this.initLayout = ::this.initLayout;
  }
  initLayout(evt) {
    const { layout } = evt.nativeEvent;
    this.setState({ contentWidth: layout.width });
  }
  render() {
    const {
      text,
      icon,
      size,
      onRemove,
      style,
      withTriangle
    } = this.props;
    const { contentWidth } = this.state;

    const left = contentWidth / 2 - 10;
    return (
      <View style={[styles.container, style]}>
        {
          !withTriangle || left <= 0 ? null :
          <View style={[
            styles.triangle,
            { left }
          ]}
          >
            <Triangle
              width={20}
              height={10}
              color={'rgba(0, 0, 0, 0.5)'}
              direction={'up'}
            />
          </View>
        }
        <View style={styles.subContainer}>
          <Text
            style={styles.content}
            onLayout={this.initLayout}
          >
          {text}
          </Text>
          <TouchableWithoutFeedback onPress={onRemove}>
            <Icon name={icon} size={size} style={styles.removeIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
