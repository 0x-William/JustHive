import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import { SearchContacts } from 'AppComponents';
import { AlertMessage } from 'AppUtilities';
import { FOLLOWER_SERVICE } from 'AppServices';

class SearchContactsContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.handleDone = ::this.handleDone;
  }

  handleDone(ids) {
    const { onDone, feathers } = this.props;
    const followersService = feathers.service(FOLLOWER_SERVICE);
    const promises = ids.map(userId => followersService.create({ userId }));

    return Promise.all(promises)
      .then(() => onDone())
      .catch((err) => AlertMessage.fromRequest(err));
  }

  render() {
    const { onBack } = this.props;
    return (
      <View>
        <SearchContacts
          onDone={this.handleDone}
          onBack={onBack}
        />
      </View>
    );
  }
}

export default connectFeathers(SearchContactsContainer);
