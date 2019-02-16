import React, { Component, PropTypes } from 'react';
import { View, StatusBar, Animated, LayoutAnimation } from 'react-native';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { SECONDARY_TEXT } from 'AppColors';
import { LoginContainer } from 'AppContainers';
import { connectFeathers } from 'AppConnectors';
import {
  LAYOUT_ANIMATION_CONFIG,
  HEXAGON_SIZE,
  HEXAGON_IMAGE_SIZE,
  HEXAGON_AVATARS,
  HEXAGON_LOGO,
} from 'AppConstants';
import { getHexagonLayout, renderHexagonImages } from 'AppUtilities';
import { styles } from '../styles';

class LoginScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    resetRouteStack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMounted: false,
      hexagonOpacity: new Animated.Value(1),
      backgroundImagesChange: false,
      showLogo: 0,
      viewTop: 0,
    };
    this.routeLoginSuccess = ::this.routeLoginSuccess;
    this.logout = ::this.logout;
    this.onImageLoadComplete = ::this.onImageLoadComplete;
    this.showLogo = ::this.showLogo;

    this.hexagons = getHexagonLayout();
    this.hexagonCount = _.sumBy(this.hexagons, (arr) => arr.length);
    this.hexagonLoadedCount = 0;

    this._animTimeout = null;
  }

  componentWillMount() {
    this.props.feathers.authenticate()
      .then(this.routeLoginSuccess)
      .catch(this.logout);
  }

  componentWillUpdate(props, state) {
    if (state.layoutAnimation !== this.state.layoutAnimation
      || state.showLogo !== this.state.showLogo || state.showLogin !== this.state.showLogin) {
      LayoutAnimation.configureNext(LAYOUT_ANIMATION_CONFIG);
    }
  }

  componentWillUnmount() {
    if (this.backgroundChangeTimer) {
      clearInterval(this.backgroundChangeTimer);
    }
    if (this._animTimeout) {
      clearTimeout(this._animTimeout);
      this._animTimeout = null;
    }
  }

  onImageLoadComplete() {
    this.hexagonLoadedCount = this.hexagonLoadedCount + 1;
    if (this.hexagonLoadedCount === 3 * this.hexagonCount) {
      this._animTimeout = setTimeout(() => {
        Animated.timing(
          this.state.hexagonOpacity,
          {
            toValue: 0.5,
            duration: 300
          }
        ).start(this.showLogo);
        this.setState({ backgroundImagesChange: !this.state.backgroundImagesChange });
        this._animTimeout = null;
      }, 500);
    }
  }

  getLogoRowInHexagons(logoStatus) {
    // logoStatus: 1 => intermidiary, below center, 2 => done, above center
    if (logoStatus === 1) {
      return _.findIndex(
        this.hexagons,
        (arr, i) => arr.length % 2 === 1 && i >= Math.floor(this.hexagons.length / 2)
      );
    } else if (logoStatus === 2) {
      return _.findLastIndex(
        this.hexagons,
        (arr, i) => arr.length % 2 === 1 && i < Math.floor(this.hexagons.length / 2)
      );
    }
    return this.hexagons.length - 1;
  }

  routeLoginSuccess() {
    this.props.resetRouteStack();
  }

  logout() {
    this.props.feathers.logout();
    this.setState({ isMounted: true });
  }

  showLogo(res) {
    if (res.finished) {
      setTimeout(() => {
        this.setState({ showLogo: 1 }, () => {
          setTimeout(() => {
            this.setState({ showLogo: 2 }, () => {
              this.backgroundChangeTimer = setInterval(
                () => this.setState({ backgroundImagesChange: !this.state.backgroundImagesChange }),
                5000
              );
              this.setState({ showLogin: true });
            });
          }, 2000);
        });
      }, 500);
    }
  }

  renderHexagons() {
    const { showLogo } = this.state;
    const centerRowForLogo = this.getLogoRowInHexagons(showLogo);

    return renderHexagonImages(_.flatten(
      this.hexagons.slice(0, centerRowForLogo + 1).map((arr, i) =>
        arr.map((h, j) => {
          let src = { uri: HEXAGON_AVATARS[_.random(0, HEXAGON_AVATARS.length - 1)] };
          let imagePadding = 0;
          if (showLogo && i === centerRowForLogo && j === Math.floor(arr.length / 2)) {
            src = HEXAGON_LOGO;
            imagePadding = 30;
          }
          return {
            key: `${i},${j}`,
            onImageLoad: this.onImageLoadComplete,
            size: HEXAGON_SIZE,
            center: h.center,
            imageSource: src,
            imageWidth: HEXAGON_IMAGE_SIZE,
            imageHeight: HEXAGON_IMAGE_SIZE,
            borderWidth: 0,
            borderColor: SECONDARY_TEXT,
            imagePadding,
          };
        })
      )
    ));
  }

  render() {
    const { feathers, routeScene } = this.props;
    const { hexagonOpacity, showLogin, isMounted, viewTop } = this.state;
    const yPosForLogoRow = this.hexagons[this.getLogoRowInHexagons(2)][0].center.y;
    const heightStyle = showLogin ? { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 } : {};
    return isMounted && (
      <View style={[styles.container, { marginTop: viewTop }]}>
        <StatusBar hidden={false} />
        <Animated.View style={[{ opacity: hexagonOpacity }, heightStyle]}>
          {this.renderHexagons()}
        </Animated.View>
        {showLogin &&
          <LoginContainer
            feathers={feathers}
            routeSignup={() => routeScene('SignupActionsScene')}
            routeForgotPassword={() => routeScene('ForgotPasswordScene')}
            routeLoginSuccess={this.routeLoginSuccess}
          />
        }
        <KeyboardSpacer
          topSpacing={0}
          onToggle={(isShow, space) => this.setState({ viewTop: -space })}
        />
      </View>
    );
  }
}

export default connectFeathers(LoginScene, true);
