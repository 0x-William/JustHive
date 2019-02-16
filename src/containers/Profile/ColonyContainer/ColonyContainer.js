import React, { Component, PropTypes } from 'react';
import { ListView, View, Image } from 'react-native';
import { Colony, ProfileTopNav } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { LabelText, GrayHeader } from 'AppFonts';
import { makeCancelable } from 'AppUtilities';
import { COLONY_SERVICE } from 'AppServices';
import { styles } from './styles';

class ColonyContainer extends Component {
  static propTypes = {
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    user: PropTypes.object,
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      colonies: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      loading: true,
      hasColonies: false,
    };
    this.renderRow = ::this.renderRow;
    this.renderListView = ::this.renderListView;
    this.getColonyPromise = null;
  }

  componentWillMount() {
    const { feathers, user } = this.props;
    const query = {
      createdBy: user && user._id || feathers.get('user')._id,
    };
    this.getColonyPromise = makeCancelable(feathers.service(COLONY_SERVICE).find({ query }));
    this.getColonyPromise
    .promise
    .then(colonies =>
      this.setState({
        colonies: this.state.colonies.cloneWithRows(colonies),
        loading: false,
        hasColonies: colonies.length > 0,
      })
    )
    .catch(error => console.log(error));
  }

  renderRow(colony) {
    return <Colony {...colony} />;
  }

  renderListView() {
    if (this.state.hasColonies) {
      return (
        <ListView
          dataSource={this.state.colonies}
          renderRow={this.renderRow}
        />
      );
    }
    return (
      <GrayHeader style={styles.center}>
        No Colonies!
      </GrayHeader>
    );
  }

  render() {
    const { routeBack, routeScene, user } = this.props;
    const rightAction = user ? () => null : () => routeScene('ColonyCreateScene');
    const rightLabel = user ?
      null : (
        <Image
          source={require('img/icons/icon_profile_colonyAdd.png')}
          style={ styles.iconColonyAdd }
        />
      );
    return (
      <View style={styles.container}>
        <ProfileTopNav
          bottomViewable={false}
          leftAction={routeBack}
          centerLabel="COLONIES"
          rightAction={rightAction}
          rightLabel={rightLabel}
        />
        {!this.state.loading && this.renderListView()}
      </View>
    );
  }
}

export default connectFeathers(ColonyContainer);
