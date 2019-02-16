import React, {
  Children,
  PropTypes,
  Component,
} from 'react';
import { AsyncStorage } from 'react-native';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import { DisconnectedError } from './DisconnectedError';
import io from './utils/socket-io';
import contextShape from './utils/contextShape';

export class FeathersWrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    wsEndpoint: PropTypes.string,
    loader: PropTypes.any,
    timeout: PropTypes.number
  };

  static defaultProps = {
    wsEndpoint: 'http://127.0.0.1:3030',
    reconnection: true,
    loader: null,
    timeout: null,
  };

  static childContextTypes = {
    feathers: contextShape
  };

  constructor(props, context) {
    super(props, context);
    const options = {
      transports: ['websocket'],
      forceNew: true,
      reconnectionDelay: props.timeout,
      reconnection: true
    };
    const socket = io(props.wsEndpoint, options);
    this._initialized = false;
    this._connected = false;
    this._addTimeout = ::this._addTimeout;
    this._clearTimeout = ::this._clearTimeout;
    this.app = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    .configure(authentication({
      storage: AsyncStorage
    }));
  }

  getChildContext() {
    return { feathers: this.app };
  }

  componentDidMount() {
    if (this.props.timeout) {
      this._addTimeout(this.props.timeout);
    }

    this.app.io.on('connect', () => {
      this._initialized = true;
      this._connected = true;
      this._clearTimeout();
      this.forceUpdate();
    });
    this.app.io.on('disconnect', () => {
      this._connected = false;
      this.forceUpdate();
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this._clearTimeout();
  }

  _addTimeout(ms) {
    if (ms > 0) {
      this._timeout = setTimeout(() => {
        this._initialized = true;
        delete this._timeout;
        this.forceUpdate();
      }, ms);
    }
  }

  _clearTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      delete this._timeout;
    }
  }

  render() {
    const {
      children,
      loader
    } = this.props;

    if (! this._initialized) {
      return loader;
    }

    // run the following code in development only

    // if (! this._connected) {
    //   return (
    //     <DisconnectedError />
    //   );
    // }

    return Children.only(children);
  }
}
