import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SimpleTopNav, CommentSelectImage } from 'AppComponents';
import { styles } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { GRAY, YELLOW, WHITE, PRIMARY_TEXT } from 'AppColors';
import { LabelText } from 'AppFonts';

export class CommentPullDownBar extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    updateStatus: PropTypes.func.isRequired,
    showSortBy: PropTypes.func.isRequired,
    panResponder: PropTypes.object.isRequired,
    showCommentSortView: PropTypes.bool.isRequired,
    activeBar: PropTypes.bool.isRequired,
    showImageSelectView: PropTypes.bool.isRequired,
    selectedImageIndex: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onRightClick = ::this.onRightClick;
    this.selectImage = ::this.selectImage;
  }

  onRightClick() {
    const { activeBar, updateStatus, showImageSelectView } = this.props;
    updateStatus(!activeBar, -1, showImageSelectView, true);
  }

  selectImage(showImageSelectView, selectedImageIndex) {
    const { images, updateStatus } = this.props;
    let activeBar = false;
    if (selectedImageIndex > -1 && selectedImageIndex < images.length) {
      activeBar = true;
    } else {
      selectedImageIndex = -1;
    }
    updateStatus(activeBar, selectedImageIndex, showImageSelectView, false);
  }

  renderRightArea(images, activeBar) {
    let ret = <View style={styles.initRightArea} />;
    if (images.length === 1) {
      if (activeBar) {
        ret = (
          <View style={[styles.navBarStyle, styles.rightAreaContainer]}>
            <LabelText style={[styles.labelHeatMap, styles.labelDeActiveHeatMap]} fontSize={12}>
              Deactivate
            </LabelText>
          </View>
        );
      } else {
        ret = (
          <View style={[styles.navBarStyle, styles.rightAreaContainer]}>
            <LabelText style={ styles.labelActiveHeatMap } fontSize={12}>
              Active Heat Map
            </LabelText>
            <Image source={require('img/icons/icon_menu.png')} style={ styles.iconMenu } />
          </View>
        );
      }
    } else if (images.length > 1) {
      if (activeBar) {
        ret = (
          <View style={[styles.navBarStyle, styles.rightAreaContainer]}>
            <LabelText style={[styles.labelHeatMap, styles.labelDeActiveHeatMap]} fontSize={12}>
              View All
            </LabelText>
          </View>
        );
      }
    }
    return ret;
  }

  renderCenterArea(images, activeBar) {
    let ret = <View />;
    const { selectedImageIndex, showImageSelectView } = this.props;
    if (images.length === 1) {
      // enable drag bar feature for showing heat map
      if (activeBar) {
        // if heap map not selected, center label only shows HeatMap
        ret = (
          <View style={[styles.navBarStyle, { alignItems: 'center', justifyContent: 'center' }]}>
            <LabelText style={ styles.labelHeatMap }>Heat Map</LabelText>
          </View>
        );
        // if heat map is seleceted, vote count, check count will show on nav bar
        ret = (
          <View style={[styles.navBarStyle, { alignItems: 'center', justifyContent: 'center' }]}>
            <Icon name="check" style={styles.iconCheck} />
            <LabelText style={ styles.labelHeatMap }>23</LabelText>
            <Image
              source={require('img/icons/icon_comment_placeholder.png')}
              style={styles.navBarCommentIcon}
            />
            <LabelText style={ styles.labelHeatMap }>23</LabelText>
          </View>
        );
      }
    } else if (images.length > 0) {
      const rectStyle = {
        flex: 1,
        borderColor: WHITE,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
      };

      if (showImageSelectView) {
        rectStyle.borderColor = YELLOW;
      }
      if (selectedImageIndex > -1) {
        rectStyle.borderColor = PRIMARY_TEXT;
      }

      const style1 = selectedImageIndex === 0 ? [styles.fillRect, rectStyle] : rectStyle;
      const style2 = selectedImageIndex === 1 ? [styles.fillRect, rectStyle] : rectStyle;
      const style3 = selectedImageIndex === 2 ? [styles.fillRect, rectStyle] : rectStyle;
      const style4 = selectedImageIndex === 3 ? [styles.fillRect, rectStyle] : rectStyle;

      ret = (
        <TouchableOpacity style={styles.rectContainer} onPress={() => this.selectImage(true, -1)}>
          <View style={styles.rectRow}>
            <View style={[style1, { borderRightWidth: 0, borderBottomWidth: 0 }]} />
            <View style={[style2, { borderBottomWidth: 0 }]} />
          </View>
          <View style={styles.rectRow}>
            <View style={[style3, { borderRightWidth: 0 }]} />
            <View style={style4} />
          </View>
        </TouchableOpacity>
      );
    }

    return ret;
  }

  renderLeftArea(activeBar) {
    const { showCommentSortView } = this.props;
    const sortByIconName = showCommentSortView ? 'keyboard-arrow-up' : 'keyboard-arrow-down';
    const sortByColor = activeBar ? PRIMARY_TEXT : WHITE;

    return (
      <View style={ styles.navBarStyle }>
        <LabelText style={[styles.labelSortBy, { color: sortByColor }]} fontSize={13}>
          Sort By
        </LabelText>
        <Icon name={sortByIconName} size={30} color={sortByColor} />
      </View>
    );
  }

  renderModalSelectImage() {
    const { showImageSelectView } = this.props;
    if (showImageSelectView) {
      return (
        <CommentSelectImage
          images = {this.props.images}
          selectImage={this.selectImage}
        />
      );
    }
    return null;
  }

  // check heat map is activated .. yellow nav bar will show
  // if images length == 1, pull down menu is related with heat map
  render() {
    const { images, panResponder, showSortBy, activeBar } = this.props;
    const navBackgroundColor = activeBar ? YELLOW : GRAY;
    const _panResponder = images.length === 1 ? panResponder.panHandlers : null;

    return (
      <View {..._panResponder}>
        <SimpleTopNav
          backgroundColor={navBackgroundColor}
          leftLabel={this.renderLeftArea(activeBar)}
          leftAction={showSortBy}
          centerLabel={this.renderCenterArea(images, activeBar)}
          rightLabel={this.renderRightArea(images, activeBar)}
          rightAction={this.onRightClick}
          sideFontSize={16}
          sideWidth={140}
        />
        {this.renderModalSelectImage()}
      </View>
    );
  }
}
