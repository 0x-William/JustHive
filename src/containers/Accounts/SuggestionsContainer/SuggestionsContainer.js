import React, { Component, PropTypes } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connectFeathers } from 'AppConnectors';
import { SimpleTopNav, Suggestions } from 'AppComponents';
import { ActionButton } from 'AppButtons';
import { GROUP_SERVICE, USER_SERVICE } from 'AppServices';
import { styles } from './styles';

class SuggestionsContainer extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    connectFacebook: PropTypes.func.isRequired,
    addFromContacts: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired
  };
  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,
      groups: [],
      people: [],
      selectedGroups: [],
      selectedPeople: []
    };
    this.suggestionsRef = null;
    this.renderLoading = ::this.renderLoading;
    this.renderNotFound = ::this.renderNotFound;
    this.isSelected = ::this.isSelected;
    this.selectUnit = ::this.selectUnit;
    this.handleDone = ::this.handleDone;
  }
  componentWillMount() {
    const { feathers } = this.props;
    const groupsService = feathers.service(GROUP_SERVICE);
    const usersService = feathers.service(USER_SERVICE);
    let groups = [
      { _id: 1, name: 'Box Office Hits', members: 402, img: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/1926783_653204088135991_3701184044511159740_n.jpg?oh=3dd1864c9326272896dd32e3d6c1ba6d&oe=581B4C9F' },
      { _id: 2, name: 'Foodies Anonymous', members: 557, img: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/1926783_653204088135991_3701184044511159740_n.jpg?oh=3dd1864c9326272896dd32e3d6c1ba6d&oe=581B4C9F' },
      { _id: 3, name: 'Artists & Makers', members: 300, img: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/1926783_653204088135991_3701184044511159740_n.jpg?oh=3dd1864c9326272896dd32e3d6c1ba6d&oe=581B4C9F' },
      { _id: 4, name: 'Lancome Cosmetics', members: 631, img: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/1926783_653204088135991_3701184044511159740_n.jpg?oh=3dd1864c9326272896dd32e3d6c1ba6d&oe=581B4C9F' }
    ];
    let people = [];

    return groupsService.find({})
      .then(data => {
        // groups = data; @TODO need for fake data
        return usersService.find({});
      })
      .then(users => people = users.splice(0, 4))
      .then(() => this.setState({ groups, people, loading: false }))
      .catch((err) => console.log(err));
  }

  handleDone() {
    const { onSubmit } = this.props;
    const result = this.suggestionsRef.getResult();
    console.log(result);
    // @TODO call feathers to save result and then call onSubmit();
    return onSubmit();
  }

  isSelected(type, id) {}
  selectUnit(type, id) {}

  renderLoading() {
    return (
      <View>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }
  renderNotFound() {
    return (
      <View>
        <Text>Suggestions Not Found :(</Text>
      </View>
    );
  }

  render() {
    const { onBack, addFromContacts, connectFacebook } = this.props;
    const { loading, groups, people } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    if (!loading && !people.length && !groups.length) {
      return this.renderNotFound();
    }

    return (
      <View style={styles.container}>
        <SimpleTopNav
          centerLabel="PEOPLE TO FOLLOW"
          centerFontSize={15}
          iconBack={true}
          leftAction={onBack}
          sideFontSize={14}
          rightLabel="DONE"
          rightAction={() => this.handleDone()}
        />
        <View style={styles.actionButtonsContainer}>
          <ActionButton
            label="Add From Your Contacts"
            onPress={addFromContacts}
            upperCase={false}
            style={styles.actionButtons}
            labelStyle={styles.actionButtonLabel}
          />
          <ActionButton
            label={(
              <View style={styles.actionFacebook}>
                <Icon name="facebook-official" size={20} color="gray" />
                <Text style={ styles.connectFacebook }>Connect to Facebook</Text>
              </View>
            )}
            onPress={connectFacebook}
            upperCase={false}
            style={styles.actionButtons}
            labelStyle={styles.actionButtonLabel}
          />
        </View>
        <Suggestions
          ref={(reference) => this.suggestionsRef = reference}
          groups={groups}
          people={people}
        />
      </View>
    );
  }
}

export default connectFeathers(SuggestionsContainer);
