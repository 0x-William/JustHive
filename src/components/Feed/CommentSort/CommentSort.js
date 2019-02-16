import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { styles } from './styles';
import { LabelText } from 'AppFonts';
import { BG_DARK_GRAY } from 'AppColors';
export class CommentSort extends Component {
  static propTypes = {
    setSortBy: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeSortBy: props.activeSortBy,
      showFullList: props.showFullList
    };
  }

  setSortBy(activeSortBy) {
    this.setState({ activeSortBy });
    this.props.setSortBy(activeSortBy);
  }

  render() {
    const items = ['HIGHEST RATED', 'MOST RECENT', 'MOST CONTROVERSIAL', 'MOST FOLLOWERS'];
    const { activeSortBy, showFullList } = this.state;
    let components = <View />;

    if (showFullList) {
      components = items.map((item, index) => {
        let activeStyle = styles.itemContainer;
        let topBorder = null;
        if (index === activeSortBy) {
          activeStyle = [styles.itemContainer, styles.activeItemContainer];
        }
        if (index > 0) {
          topBorder = styles.topBorder;
        }
        return (
          <TouchableHighlight
            index={index}
            key={index}
            style={[activeStyle, topBorder]}
            underlayColor={ BG_DARK_GRAY }
            onPress={() => this.setSortBy(index)}
          >
            <View>
              <LabelText style={styles.label}>{item}</LabelText>
            </View>
          </TouchableHighlight>
        );
      });
    } else if (activeSortBy > -1) {
      components = (
        <View style={[styles.itemContainer, styles.activeItemContainer]}>
          <LabelText style={styles.label}>{items[activeSortBy]}</LabelText>
        </View>
      );
    }

    return (
      <View>
        {components}
      </View>
    );
  }
}
