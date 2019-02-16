import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  InteractionManager
} from 'react-native';
import { HexagonGrid } from 'AppComponents';
import _ from 'lodash';
import { styles } from './styles';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'AppConstants';

export class PostDoneView extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      pressed: null,
      animationStarted: false,
      hexagons: [
        ..._.range(60).map(() => ({ color: 'white', opacity: 0.2 })),
      ],
      backgroundOpacity: new Animated.Value(0.7),
      beePosition: new Animated.Value(-1),
      beeOpacity: new Animated.Value(0),
      contentOpacity: new Animated.Value(1),
      hexagonsScale: new Animated.Value(1),
      hexagonsMarginTop: new Animated.Value(0),
      finalLabelOpacity: new Animated.Value(0)
    };
    this.changeStyle = ::this.changeStyle;
    this.startAnimation = ::this.startAnimation;
    this.resetWithoutRender = ::this.resetWithoutRender;
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.isVisible) {
      // We dont need for setState, because it will re-render component
      // @TODO for development, needs to be removed
      this.resetWithoutRender();
    }
    return true;
  }

  startAnimation() {
    InteractionManager.runAfterInteractions(() => {
      this.props.onSubmit();
    });
    Animated.sequence([
      Animated.timing(this.state.backgroundOpacity, {
        toValue: 1,
        duration: 300
      }),
      Animated.parallel([
        Animated.timing(this.state.beeOpacity, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.contentOpacity, {
          toValue: 0,
          duration: 700
        }),
        Animated.timing(this.state.beePosition, {
          toValue: 275,
          duration: 1400
        }),
      ])
    ]).start(() => {
      Animated.sequence([
        Animated.timing(this.state.beeOpacity, {
          toValue: 0,
          duration: 1000
        }),
        Animated.parallel([
          Animated.timing(this.state.hexagonsScale, {
            toValue: 10,
            duration: 3000
          }),
          Animated.timing(this.state.hexagonsMarginTop, {
            toValue: -3000,
            duration: 3000
          }),
          Animated.timing(this.state.backgroundOpacity, {
            toValue: 0.2,
            duration: 1000
          }),
          Animated.timing(this.state.finalLabelOpacity, {
            toValue: 1,
            duration: 3000
          })
        ])
      ]).start();
      const { hexagons } = this.state;
      LayoutAnimation.easeInEaseOut();
      this.setState({
        animationStarted: true,
        hexagons: [{
          type: 'image',
          imageSource: require('img/images/hexagon_wonderfull.png'),
          imageHeight: 800,
          imageWidth: 600
        }, ...hexagons]
      });
    });
  }

  changeStyle(pressed) {
    this.setState({ pressed });
  }

  resetWithoutRender() {
    this.state.pressed = null;
    this.state.backgroundOpacity = new Animated.Value(0.7);
    this.state.beePosition = new Animated.Value(10);
    this.state.beeOpacity = new Animated.Value(0);
    this.state.contentOpacity = new Animated.Value(1);
    this.state.hexagonsScale = new Animated.Value(1);
    this.state.finalLabelOpacity = new Animated.Value(0);
    this.state.hexagons = [
      ..._.range(60).map(() => ({ color: 'white', opacity: 0.2 }))
    ];
    this.state.hexagonsMarginTop = new Animated.Value(0);
  }

  render() {
    const {
      pressed,
      hexagons,
      hexagonsScale,
      hexagonsMarginTop,
      beePosition,
      beeOpacity,
      backgroundOpacity,
      contentOpacity,
      finalLabelOpacity
    } = this.state;

    const { onCancel, isVisible } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: backgroundOpacity,
              marginTop: hexagonsMarginTop,
              transform: [
                { scale: hexagonsScale },
              ]
            }}
          >
            <HexagonGrid
              width={WINDOW_WIDTH}
              height={WINDOW_HEIGHT}
              spacing={20}
              style={styles.hexagonGrid}
              hexagons={hexagons}
              hexagonSize={80}
            />
          </Animated.View>
          <Animated.Image
            source={require('img/icons/icon_logo.png')}
            style={[styles.beeIcon, { bottom: beePosition, opacity: beeOpacity }]}
            resizeMode="contain"
          />
          <Animated.View style={{ opacity: finalLabelOpacity }}>
            <View style={styles.wonderfull}>
              <Text style={styles.wonder_full_post}>
                wonder-full post!
              </Text>
            </View>
          </Animated.View>
          <Animated.View
            style={{ opacity: contentOpacity }}
          >
            <View style={styles.content}>
              <Text style={styles.title}>
                Looks like you are ready to create some buzz!
              </Text>
              <View style={styles.buttonsSection}>
                <TouchableOpacity
                  onPress={() => onCancel()}
                  onPressIn={() => this.changeStyle('cancel')}
                >
                  <View
                    style={[styles.button, pressed === 'cancel' ? styles.pressed : {}]}
                  >
                    <Text style={styles.buttonText}>
                      NOT YET
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatorContainer}>
                  <Text style={styles.separator}>
                    |
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.startAnimation()}
                  onPressIn={() => this.changeStyle('send')}
                >
                  <View
                    style={[styles.button, pressed === 'send' ? styles.pressed : {}]}
                  >
                    <Text style={styles.buttonText}>
                      SEND
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
