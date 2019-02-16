import React, { Component, PropTypes, cloneElement } from 'react';
import { View, Text, TextInput } from 'react-native';
import _ from 'lodash';
import { VALIDATIONS } from 'AppConstants';
import { AuxText } from 'AppFonts';
import { styles } from './styles';

export class Form extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      input: PropTypes.element.isRequired,
      validations: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ])),
    })).isRequired,
    initialValues: PropTypes.object,
    submitting: PropTypes.bool,
    renderFooter: PropTypes.func,
    style: View.propTypes.style,
    labelStyle: Text.propTypes.style,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    initialValues: {},
  }

  constructor(props, context) {
    super(props, context);
    this.state = { values: null, errors: null, dirty: false };
    this.submit = ::this.submit;
    this.reset = ::this.reset;
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentDidUpdate() {
    if (this.state.values) {
      return;
    }
    this.setInitialValues();
  }

  getFieldError(field) {
    const { errors } = this.state;
    return errors && errors[field.name];
  }

  hasErrors() {
    const { errors } = this.state;
    if (errors) {
      return Object.values(errors).filter(error => error).length > 0;
    }
    return false;
  }

  setInitialValues() {
    const { fields, initialValues } = this.props;
    this.setState({
      values: fields.reduce((values, field) => {
        return _.set(values, field.name, initialValues[field.name]);
      }, {}),
    });
  }

  validate() {
    return new Promise(resolve => {
      this.setState({
        errors: this.props.fields.reduce((errors, field) => {
          const firstError = field.validations && field.validations.map(validation => {
            return validation(this.state.values[field.name], this.state.values);
          }).find(error => error);
          return {
            ...errors,
            [field.name]: firstError,
          };
        }, {}),
      }, resolve);
    });
  }

  async submit() {
    await this.validate();
    if (this.hasErrors()) {
      return;
    }
    const { initialValues, onSubmit } = this.props;
    const values = _.merge(initialValues, this.state.values);
    onSubmit && onSubmit(values);
    this.setState({ dirty: false });
  }

  reset() {
    this.setInitialValues()
    this.setState({ errors: null, dirty: false })
  }

  handleFieldInputChange(fieldName) {
    return event => {
      this.setState({
        values: _.set(this.state.values, fieldName, event.nativeEvent.text),
        dirty: true
      });
    };
  }

  renderFieldInput(field) {
    const {
      multiline,
      numberOfLines = 1,
      editable,
      style
    } = field.input.props;
    return cloneElement(field.input, {
      value: _.get(this.state.values, field.name),
      editable: editable !== undefined ? editable : !this.props.submitting,
      style: [
        styles.input,
        multiline && { height:  numberOfLines * 40 },
        style,
      ],
      onChange: this.handleFieldInputChange(field.name),
    });
  }

  render() {
    const { fields, style, labelStyle, renderFooter } = this.props;
    const { errors, dirty } = this.state;
    return (
      <View style={[styles.container, style]}>
        {fields.map(field => {
          const error = this.getFieldError(field);
          return (
            <View key={field.name} style={styles.row}>
              <AuxText style={[
                styles.label,
                field.input.props.multiline && styles.multilineLabel,
                labelStyle,
              ]}>
                {field.label}
              </AuxText>
              <View style={styles.inputContainer}>
                {this.renderFieldInput(field)}
                {error && <Text style={styles.error}>{error}</Text>}
              </View>
            </View>
          );
        })}
        {renderFooter && renderFooter({
          errors,
          dirty,
          submit: this.submit,
          reset: this.reset,
        })}
      </View>
    );
  }
}
