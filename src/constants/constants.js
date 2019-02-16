import { Dimensions, LayoutAnimation } from 'react-native';
import Camera from 'react-native-camera';
import { isEmail, isMobilePhone } from 'validator';

const { width, height } = Dimensions.get('window');

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const STATUSBAR_HEIGHT = 20;
export const NAVBAR_HEIGHT = 50;
export const CAPTURE_VIDEO = Camera.constants.CaptureMode.video;
export const CAPTURE_PICTURE = Camera.constants.CaptureMode.still;

export const HEXAGON_SIZE = 82;
export const HEXAGON_IMAGE_SIZE = 2 * HEXAGON_SIZE / Math.sqrt(3);
export const HEXAGON_PADDING = 10;
export const HEATMAP_HEXAGON_X_COUNT = 15;
export const HEXAGON_AVATARS = [
  'https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/sergeyalmone/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/richardgarretts/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/lhausermann/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/baluli/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/nsamoylov/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/brandonmorreale/128.jpg',
  'https://s3.amazonaws.com/uifaces/faces/twitter/bruno_mart/128.jpg',
];
export const HEXAGON_LOGO = require('img/icons/icon_logo.png');
export const LAYOUT_ANIMATION_CONFIG = {
  duration: 2000,
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity
  }
};

export const SOCIAL_ITEMS = [
  {
    name: 'Email',
    icon: require('img/icons/icon_email.png'),
    style: {
      width: 23,
      height: 17
    }
  },
  {
    name: 'Text',
    icon: require('img/icons/icon_text.png'),
    style: {
      width: 23,
      height: 21
    }
  },
  {
    name: 'Facebook',
    icon: require('img/icons/icon_facebook.png'),
    style: {
      width: 12,
      height: 23
    }
  },
  {
    name: 'Twitter',
    icon: require('img/icons/icon_twitter.png'),
    style: {
      width: 23,
      height: 20
    }
  },
  {
    name: 'Pinterest',
    icon: require('img/icons/icon_pinterest.png'),
    style: {
      width: 23,
      height: 25
    }
  }
];

export const SEARCH_DELAY_TIME = 1500;
export const SEARCH_FILTERS = {
  ALL: 'All',
  COLONIES: 'Colonies',
  PEOPLE: 'People',
  PLACES: 'Places',
  GROUPS: 'Groups',
};
export const VALIDATIONS = {
  required: (message = 'Required') => value => !value && message,
  email: (message = 'Invalid email') => value => value && !isEmail(value) && message,
  phone: (locale = 'en-US', message = 'Invalid phone') =>
    value => value && !isMobilePhone(value, locale) && message
  ,
};
