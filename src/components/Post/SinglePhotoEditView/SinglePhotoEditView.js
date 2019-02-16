/**
 * Created by nick on 19/07/16.
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  PanResponder,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { GOOGLE_API_KEY } from 'AppConfig';
import { WINDOW_WIDTH } from './constants';
import { styles, googlePlacesStyles } from './styles';
import { PhotoEditControlView } from './PhotoEditControlView';
import { PhotoEditView } from './PhotoEditView';
import { TextEditControlView } from './TextEditControlView';
import { PhotoTitleBar } from './PhotoTitleBar';
import { PhotoTag } from './PhotoTag';
import { PeoplesView } from './PeoplesView';

export class SinglePhotoEditView extends Component {
  static propTypes = {
    imageSource: PropTypes.object.isRequired,
    imageIndex: PropTypes.number.isRequired,
    feathers: PropTypes.object.isRequired,
    activeFilter: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeInput: '',
      filter: '',
      textFilter: '',
      isSpinnerVisible: false,
      title: '',
      location: '',
      height: 60,
      textInputs: [],
      tags: [],
      rightNavBarState: 'Icon',
    };

    this.currentLocationLabel = (
      <View width={100} height={100} style={styles.currentLocationView}>
        <FAIcon name="location-arrow" style={styles.currentLocationIcon} size={20} />
        <Text style={styles.currentLocationText}> Find Your Location </Text>
      </View>
    );
    this._tagPosition = {
      top: 0,
      left: 0
    };
    this.editPhotoView = null;
    this._panResponder = null;
    this.setTextFilter = ::this.setTextFilter;
    this.setImageFilter = ::this.setImageFilter;
    this.onChangeHeight = ::this.onChangeHeight;
    this.onChangeTitle = ::this.onChangeTitle;
    this._shouldSet = ::this._shouldSet;
    this._onGrant = ::this._onGrant;
    this._onChange = ::this._onChange;
    this.renderTextInput = ::this.renderTextInput;
    this.setActiveInput = ::this.setActiveInput;
    this.setLocation = ::this.setLocation;
    this.onRemoveLocation = ::this.onRemoveLocation;
    this.renderPeoplesView = ::this.renderPeoplesView;
    this.onPeoplesViewClose = ::this.onPeoplesViewClose;
    this.toggleFocused = ::this.toggleFocused;
    this.removeTextInput = ::this.removeTextInput;
    this.doneTextFilter = ::this.doneTextFilter;
    this.onPeoplesViewSelect = ::this.onPeoplesViewSelect;
    this.removeTag = ::this.removeTag;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._shouldSet,
      onStartShouldSetPanResponderCapture: this._shouldSet,
      onPanResponderGrant: this._onGrant
    });
  }

  onChangeHeight(newHeight) {
    const { height } = this.state;
    return newHeight !== height ? this.setState({ height: height + 10 }) : null;
  }

  onChangeTitle(title) {
    this.setState({ title });
  }

  onRemoveLocation() {
    this.setLocation({});
  }

  onPeoplesViewSelect(user) {
    const { top, left } = this._tagPosition;
    const tagShape = {
      top,
      left,
      user: user._id,
      name: user.name
    };
    const tags = this.state.tags.concat([tagShape]);
    this.setState({ tags, activeInput: 'people' });
  }

  onPeoplesViewClose() {
    this.setActiveInput('people');
  }

  setImageFilter(filter) {
    this.setState({ filter });
  }

  setLocation(data = {}) {
    const location = data.description;
    const activeInput = '';
    LayoutAnimation.easeInEaseOut();
    this.setState({ location, activeInput });
  }

  setTextFilter(filter) {
    const textFilter = this.state.textFilter === filter ? '' : filter;
    this.setState({ textFilter });
  }

  setActiveInput(activeInput = '') {
    const { activeFilter } = this.props;
    if (activeFilter === '') {
      LayoutAnimation.easeInEaseOut();
      const updateState = {
        activeInput: activeInput === this.state.activeInput ? '' : activeInput,
      };
      if (activeInput === 'people') {
        updateState.rightNavBarState = 'Label';
      }
      this.setState(updateState);
    }
  }

  captureFrame() {
    this.setState({ isSpinnerVisible: true });
    return new Promise((resolve) => {
      this.editPhotoView.capture()
        .then((captured) => {
          this.setState({ isSpinnerVisible: false });
          resolve(captured);
        });
    });
  }

  doneTextFilter() {
    const { textInputs } = this.state;
    const newState = [].concat(textInputs).map(input => {
      this.refs[input.key].blur();
      return { ...input, focused: false };
    });

    this.setState({
      textInputs: newState,
      textFilter: '',
      activeInput: '',
    });
  }

  _shouldSet(evt) {
    const { textFilter, activeInput } = this.state;
    const { activeFilter } = this.props;
    if (activeInput === 'people') {
      this._tagPosition = { // save tap position
        top: evt.nativeEvent.locationY,
        left: evt.nativeEvent.locationX
      };
      this.setState({ activeInput: 'tag' });
      return true;
    }
    return activeFilter === 'textFilter' && textFilter !== '';
  }

  _onGrant(evt) {
    const { locationX, locationY } = evt.nativeEvent;
    const { activeFilter } = this.props;
    const { textInputs } = this.state;
    if (activeFilter !== 'textFilter') {
      return;
    }
    this.setState({
      textInputs: textInputs.concat({
        key: textInputs.length + 1,
        left: locationX,
        top: locationY,
        width: 75,
        height: 20, // as default
        value: '',
        focused: true
      })
    });
  }

  _onChange(width, input, value) {
    if (input.width >= width) { // @TODO it needs to be fixed
      return;
    }
    const newState = this.state.textInputs.map(item => {
      if (item.key === input.key) {
        return { ...item, width: width + 20, value };
      }
      return item;
    });
    this.setState({ textInputs: newState });
  }

  toggleFocused(key, status) {
    const textInputs = this.state.textInputs.map(input => {
      if (input.key === key) {
        return { ...input, focused: status };
      }
      return input;
    });
    this.setState({ textInputs });
  }

  removeTag(removeTag) {
    const { tags: currentTags } = this.state;
    const tags = currentTags.filter(({ top, left }) =>
      top !== removeTag.top && left !== removeTag.left
    );
    this.setState({ tags });
  }

  removeTextInput({ key }) {
    const { textInputs } = this.state;
    const newState = textInputs.filter((item) => item.key !== key);
    this.setState({ textInputs: newState });
  }

  renderControl() {
    const { imageSource, activeFilter } = this.props;
    switch (activeFilter) {
      case 'imageFilter':
        return (
          <PhotoEditControlView
            imageSource={imageSource}
            setImageFilter={this.setImageFilter}
          />
        );
      case 'textFilter':
        return (
          <TextEditControlView
            setTextFilter={this.setTextFilter}
            textFilter={this.state.textFilter}
          />
        );
      default:
        return null;
    }
  }

  renderTextInput(input, i) {
    const { left, top, width, focused, value } = input;
    return (
      <View key={i} style={[styles.textInputContainer, { left, top }]}>
        <TextInput
          multiline={true}
          ref={input.key}
          onChange={({ nativeEvent }) => (
            this._onChange(nativeEvent.contentSize.width, input, nativeEvent.text)
          )}
          autoFocus={true}
          autoCorrect={false}
          value={value}
          onFocus={() => this.toggleFocused(input.key, true)}
          onBlur={() => this.toggleFocused(input.key, false)}
          blurOnSubmit={true}
          style={[
            styles.textInput,
            focused && styles.focusedInput,
            { width }
          ]}
        />
        {
          focused && (
            <TouchableOpacity onPress={() => this.removeTextInput(input)}>
              <Icon name="highlight-off" size={20} style={[styles.closeIcon]} />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }

  renderPhotoTags() {
    return this.state.tags.map((tag, index) => (
      <PhotoTag
        key={index}
        text={tag.name}
        onRemove={() => this.removeTag(tag)}
        style={{ top: tag.top, left: tag.left }}
        withTriangle={true}
      />
    ));
  }

  renderPeoplesView() {
    if (this.state.activeInput !== 'tag') {
      return null;
    }
    return (
      <PeoplesView
        onClose={this.onPeoplesViewClose}
        onTextChanged={this.onPeoplesViewTextChanged}
        feathers={this.props.feathers}
        onSelect={this.onPeoplesViewSelect}
      />
    );
  }

  renderTopBottomBlackArea(flagTop) {
    const { activeFilter } = this.props;
    const { activeInput } = this.state;
    const ret = activeFilter === '' ?
      (
        <View style={styles.blackSpacer}>
          { flagTop && activeInput === 'people' &&
          <Text style={styles.peoplePlaceholder}>TAP ANYWHERE TO TAG</Text>
          }
        </View>
      ) : <View />;
    return ret;
  }

  render() {
    const {
      imageSource
    } = this.props;

    const {
      activeInput,
      height,
      title,
      filter,
      textInputs,
      location,
      isSpinnerVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <Spinner visible={isSpinnerVisible} />
        <PhotoTitleBar
          onChangeTitle={this.onChangeTitle}
          onChangeHeight={this.onChangeHeight}
          height={height}
          title={title}
          activeInput={activeInput}
          setActiveInput={this.setActiveInput}
          placeholder="NAME OF PHOTO"
        />
        {this.renderTopBottomBlackArea(true)}
        <View
          style={ styles.panView }
          {...this._panResponder.panHandlers}
        >
          <PhotoEditView
            ref={(ref) => this.editPhotoView = ref}
            filter={filter}
            image={imageSource}
            cropHeight={WINDOW_WIDTH}
            cropWidth={WINDOW_WIDTH}
            zoom={1}
            maxZoom={80}
            minZoom={0}
          />
          { this.renderPhotoTags() }
          {textInputs.map(this.renderTextInput)}
        </View>
        {location ? (
          <PhotoTag
            text={location}
            onRemove={this.onRemoveLocation}
          />
        ) : null}
        { activeInput === 'location' ?
          <View style={styles.googlePlacesContainer}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              currentLocation={true}
              enablePoweredByContainer={false}
              currentLocationLabel={this.currentLocationLabel}
              styles={googlePlacesStyles}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
              }}
              onPress={this.setLocation}
            />
          </View> : null }
        {this.renderPeoplesView()}
        {this.renderTopBottomBlackArea(false)}
        {this.renderControl()}
      </View>
    );
  }
}

