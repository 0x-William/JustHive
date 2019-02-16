import React, { Component, PropTypes } from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Picker from 'react-native-picker';
import { SimpleTopNav } from 'AppComponents';
import { dismissKeyboard } from 'AppUtilities';
import { PRIMARY_TEXT, WHITE } from 'AppColors';
import { styles } from './styles';
import { LabelText } from 'AppFonts';
import _ from 'lodash';

function refactor(num) {
  if (!num) return '00';
  let result = num;
  if (num.toString().length < 2) {
    result = `0${num.toString()}`;
  }
  return result;
}

export class PostTimerView extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      weeks: 0,
      hours: 0,
      min: 0,
      days: 0,
      weeksFocused: false,
      daysFocused: false,
      hoursFocused: false
    };

    this.hoursPicker = null;
    this.onChange = ::this.onChange;
    this.toggleHoursPicker = ::this.toggleHoursPicker;
    this.toggleFocus = ::this.toggleFocus;
    this._toggleHoursTimeout = null;
  }

  componentWillUnmount() {
    if (this._toggleHoursTimeout) {
      clearTimeout(this._toggleHoursTimeout);
      this._toggleHoursTimeout = null;
    }
  }

  onChange(key, value, key2, value2) {
    const newState = {
      [key]: isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)
    };
    if (key2) { // Hours and Minutes
      newState[key2] = isNaN(parseInt(value2, 10)) ? 0 : parseInt(value2, 10);
      newState.hoursFocused = false;
    }
    this.setState(newState);
  }

  toggleHoursPicker() {
    dismissKeyboard(); // hide keyboard
    this.hoursPicker.toggle();
    this._toggleHoursTimeout = setTimeout(() => {
      this.setState({
        hoursFocused: this.hoursPicker._isPickerShow
      });
      this._toggleHoursTimeout = null;
    }, 350); // animation duration 300 ms
  }

  toggleFocus(key, value) {
    this.setState({
      [key]: value
    });
  }

  renderNavBar() {
    const {
      weeks,
      hours,
      min,
      days,
    } = this.state;

    const leftLabel = (
      <View style={ styles.leftLabelView }>
        <LabelText style={ styles.leftLabelText } fontSize={15}>BACK</LabelText>
      </View>
    );
    const rightLabel = (
      <View style={ styles.rightLabelView }>
        <LabelText style={ styles.rightLabelText } fontSize={15}>DONE</LabelText>
      </View>
    );
    const centerLabel = (
      <View>
        <LabelText style={ styles.centerLabelText } fontSize={15}>POST TIMER</LabelText>
      </View>
    );

    return (
      <SimpleTopNav
        leftLabel={leftLabel}
        centerLabel={centerLabel}
        rightLabel={rightLabel}
        rightAction={() => this.props.onSubmit({ days, weeks, hours, min })}
        leftAction={this.props.onCancel}
        backgroundColor={WHITE}
      />
    );
  }

  render() {
    const {
      isVisible,
      onCancel
    } = this.props;

    const {
      weeks,
      hours,
      min,
      days,
      daysFocused,
      weeksFocused,
      hoursFocused
    } = this.state;

    const hoursRange = _.range(24);
    const minRange = _.range(59);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <View>
          {this.renderNavBar()}
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <LabelText style={styles.label} fontSize={13}>
              MINS/HOURS
            </LabelText>
            <TouchableWithoutFeedback onPress={this.toggleHoursPicker}>
            <View>
            <TextInput
              style={[styles.rowInput, hoursFocused ? styles.focused : {}]}
              editable={false}
              value={`${refactor(hours)} : ${refactor(min)}`}
            />
            </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.label} fontSize={13}>
              DAYS
            </LabelText>
            <TextInput
              keyboardType="numeric"
              style={[styles.rowInput, daysFocused ? styles.focused : {}]}
              onChangeText={(num) => this.onChange('days', num)}
              onFocus={() => this.toggleFocus('daysFocused', true)}
              onBlur={() => this.toggleFocus('daysFocused', false)}
              value={days.toString()}
            />
          </View>
          <View style={styles.row}>
            <LabelText style={styles.label} fontSize={13}>
              WEEKS
            </LabelText>
            <TextInput
              keyboardType="numeric"
              style={[styles.rowInput, weeksFocused ? styles.focused : {}]}
              value={weeks.toString()}
              onChangeText={(num) => this.onChange('weeks', num)}
              onFocus={() => this.toggleFocus('weeksFocused', true)}
              onBlur={() => this.toggleFocus('weeksFocused', false)}
            />
          </View>
        </View>
        <Picker
          ref={picker => this.hoursPicker = picker}
          showDuration={300}
          showMask={true}
          pickerTitle="MIN/HOURS"
          selectedValue={[hours, min]}
          pickerData={[
            ['Select Hours', ...hoursRange],
            ['Select Minutes', ...minRange]
          ]}
          onPickerDone={(data) => this.onChange('hours', data[0], 'min', data[1])}
          onPickerCancel={() => this.toggleFocus('hoursFocused', false)}
        />
      </Modal>
    );
  }
}
