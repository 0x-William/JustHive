import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { SimpleTopNav, ToggleButton } from 'AppComponents';
import { PRIMARY_TEXT, LIGHT_TEXT } from 'AppColors';
import MessageContainer from './MessageContainer';
import NotificationContainer from './NotificationContainer';
import { connectFeathers } from 'AppConnectors';
import { AuxText, LabelText } from 'AppFonts';
import { styles } from './styles';

class ThreadContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeMessages: PropTypes.func.isRequired,
    routeNotificationDetail: PropTypes.func.isRequired,
    routeCreateThread: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 0,
      selectMode: false
    };
    this.selectAll = ::this.selectAll;
    this.deleteItems = ::this.deleteItems;
    this.onTabSelected = ::this.onTabSelected;
    this.updateSelectMode = ::this.updateSelectMode;
    this.messageContainer = null;
    this.notificationContainer = null;
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  onTabSelected(selectedTab) {
    this.setState({ selectedTab });
  }

  updateSelectMode() {
    if (this.state.selectedTab === 0) {
      this.setState({ selectMode: !this.state.selectMode });
    }
  }

  selectAll() {
    const { selectedTab } = this.state;
    if (selectedTab === 0) {
      this.messageContainer.selectAllThread();
    }
  }

  deleteItems() {
    const { selectedTab } = this.state;
    if (selectedTab === 0) {
      this.messageContainer.deleteThreads();
    }
  }

  renderTabContent(selectedTab) {
    const { selectMode } = this.state;
    if (selectedTab === 0) {
      return (
        <MessageContainer
          ref={(ref) => this.messageContainer = ref}
          {...this.props}
          selectMode={selectMode}
        />
      );
    }
    return (
      <NotificationContainer
        ref={(ref) => this.notificationContainer = ref}
        {...this.props}
        selectMode={selectMode}
      />
    );
  }

  renderDeletePanel() {
    return (
      <View style={styles.deletePanelContainer}>
        <View style={ styles.deletePanelSelectAllView }>
          <TouchableOpacity
            style={[styles.bottomButton, styles.btnSelectAll]}
            onPress={this.selectAll}
          >
            <LabelText>Select All</LabelText>
          </TouchableOpacity>
        </View>
        <View style={ styles.deletePanelDeleteView }>
          <TouchableOpacity
            style={[styles.bottomButton, styles.btnDelete]}
            onPress={this.deleteItems}
          >
            <LabelText style={ styles.btnDeleteLabel }>Delete</LabelText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      loading,
      selectedTab,
      selectMode,
    } = this.state;

    const leftLabel = selectedTab === 0 ? (
      <View style={ styles.leftLabelView }>
        <AuxText style={ styles.leftLabelText }>{selectMode ? 'Cancel' : 'Edit'}</AuxText>
      </View>
    ) : <View />;
    const rightLabel = selectedTab === 0 ? (
      <View style={ styles.rightLabelView } >
        <Image source={require('img/icons/icon_new_thread.png')} style={styles.iconNewThread} />
      </View>
    ) : <View />;
    const centerLabel = (
      <View>
        <LabelText style={ styles.centerLabelText } fontSize={15}>NOTIFICATIONS</LabelText>
      </View>
    );
    const iconMessage = require('img/icons/icon_nav_message.png');
    const iconAlert = require('img/icons/icon_alert.png');
    const toggleButtons = [
      {
        text: 'Messages (0)',
        icon: <Image source={iconMessage} style={styles.toggleMessageIcon} />
      },
      {
        text: 'Alerts (0)',
        icon: <Image source={iconAlert} style={styles.toggleAlertIcon} />
      }
    ];
    return (
      <View style={styles.wrap}>
        <SimpleTopNav
          backgroundColor={PRIMARY_TEXT}
          color={LIGHT_TEXT}
          leftLabel={leftLabel}
          rightLabel={rightLabel}
          leftAction={this.updateSelectMode}
          rightAction={selectedTab === 0 ? this.props.routeCreateThread : null}
          centerLabel={centerLabel}
        />
        <ToggleButton
          options={toggleButtons}
          onSelect={this.onTabSelected}
          value={selectedTab}
        />
        {this.renderTabContent(selectedTab)}
        {selectMode && this.renderDeletePanel()}
        <View>
          {loading ? <Text style={ styles.loadingText }>Loading</Text> : null}
        </View>
      </View>
    );
  }
}

export default connectFeathers(ThreadContainer);
