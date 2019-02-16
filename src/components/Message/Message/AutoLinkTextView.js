/**
 * Created by nick on 06/07/16.
 */
import React, { PropTypes } from 'react';
import Autolinker from 'autolinker';
import { Linking, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  link: {
    color: '#0E7AFE',
  },
});

const getURL = (match, hashtag) => {
  const type = match.getType();
  switch (type) {
    case 'email':
      return `mailto:${encodeURIComponent(match.getEmail())}`;
    case 'hashtag':
      {
        const tag = encodeURIComponent(match.getHashtag());
        switch (hashtag) {
          case 'facebook':
            return `facebook://hashtag/${tag}`;
          case 'instagram':
            return `instagram://tag?name=${tag}`;
          case 'twitter':
            return `twitter://search?query=%23${tag}`;
          default:
            return match.getMatchedText();
        }
      }
    case 'phone':
      return `tel:${match.getNumber()}`;
    case 'twitter':
      return `twitter://user?screen_name=${encodeURIComponent(match.getTwitterHandle())}`;
    case 'url':
      return match.getAnchorHref();
    default:
      return match.getMatchedText();
  }
}

const renderLink = (index, text, url, truncate, truncateChars) => {
  const truncated = (truncate > 0) ?
    Autolinker.truncate.TruncateSmart(text, truncate, truncateChars) : text;
  return (
    <Text
      key={index}
      style={styles.link}
      onPress={() => Linking.openURL(url)}
    >
      {truncated}
    </Text>
  );
}

export const AutoLinkTextView = ({
  text,
  email,
  hashtag,
  phone,
  stripPrefix,
  twitter,
  url,
  style,
  truncate,
  truncateChars
}) => {
  const uid = Math.floor(Math.random() * 0x10000000000).toString(16);
  const tokenRegexp = new RegExp(`(@__ELEMENT-${uid}-\\d+__@)`, 'g');

  const generateToken = (() => {
    let counter = 0;
    return () => `@__ELEMENT-${uid}-${counter++}__@`;
  })();

  const matches = {};
  let linkText = '';
  try {
    linkText = Autolinker.link(text || '', {
      email,
      hashtag,
      phone,
      twitter,
      urls: url,
      stripPrefix,
      replaceFn: (autolinker, match) => {
        const token = generateToken();
        matches[token] = match;
        return token;
      },
    });
  } catch (e) {
    console.warn(e);
    return null;
  }

  const nodes = linkText
    .split(tokenRegexp)
    .filter((part) => !!part)
    .map((part, index) => {
      const match = matches[part];

      if (!match) return part;

      switch (match.getType()) {
        case 'email':
        case 'hashtag':
        case 'phone':
        case 'twitter':
        case 'url':
          {
            const _url = getURL(match, hashtag);
            const anchorText = match.getAnchorText();
            return renderLink(index, anchorText, _url, truncate, truncateChars);
          }

        default:
          return part;
      }
    });
  return (
    <Text style={style}>
      {nodes}
    </Text>
  );
};

AutoLinkTextView.defaultProps = {
  email: true,
  hashtag: 'facebook',
  phone: true,
  stripPrefix: true,
  truncate: 32,
  truncateChars: '..',
  twitter: true,
  url: true,
};

AutoLinkTextView.propTypes = {
  email: PropTypes.bool,
  hashtag: PropTypes.oneOf([false, 'facebook', 'instagram', 'twitter']),
  linkStyle: Text.propTypes.style,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  phone: PropTypes.bool,
  renderLink: PropTypes.func,
  stripPrefix: PropTypes.bool,
  text: PropTypes.string.isRequired,
  truncate: PropTypes.number,
  truncateChars: PropTypes.string,
  twitter: PropTypes.bool,
  url: PropTypes.bool,
  style: Text.propTypes.style,
};
