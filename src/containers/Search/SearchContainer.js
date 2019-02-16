import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import { SEARCH_DELAY_TIME, SEARCH_FILTERS } from 'AppConstants';
import {
  SearchInput,
  SearchColonyList,
  SearchFilterBar,
  SearchResults
} from 'AppComponents';
import { styles } from './styles';
import debounce from 'lodash/debounce'
import { SEARCH_SERVICE } from 'AppServices';

class SearchContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchText: '',
      activeFilter: SEARCH_FILTERS.ALL,
      results: null,
      isLoading: false,
      error: null,
    };
    this.prepareForFetch = ::this.prepareForFetch;
    this.fetchResults = debounce(::this.fetchResults, SEARCH_DELAY_TIME);
    this.handleSearchTextChange = ::this.handleSearchTextChange;
    this.handleFilterChange = ::this.handleFilterChange;
  }

  prepareForFetch() {
    this.setState({ isLoading: true, error: null }, this.fetchResults);
  }

  async fetchResults() {
    const { searchText } = this.state;
    if (searchText) {
      const { feathers } = this.props;
      try {
        this.setState({
          results: await feathers.service(SEARCH_SERVICE).create({ query: searchText }),
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
    this.setState({ isLoading: false });
  }

  getResults() {
    const { results } = this.state;
    if (!results) {
      return [];
    }
    const normalizedResults = this.normalizeResults(results);
    const filteredResults = this.filterResults(normalizedResults);
    return filteredResults;
  }

  normalizeResults(results) {
    const { users = [], posts = [] } = results;
    return [
      ...users.map(user => ({
        type: 'User',
        imageUrl: user.avatarUrl,
        label: user.name,
        id: user._id,
      })),
      ...posts.map(post => ({
        type: 'Post',
        imageUrl: post.images && post.images[0].url,
        label: post.title,
        id: post._id,
      })),
    ];
  }

  filterResults(results) {
    const { activeFilter } = this.state;
    if (activeFilter === SEARCH_FILTERS.ALL) {
      return results;
    }
    if (activeFilter === SEARCH_FILTERS.COLONIES) {
      return results.filter(({ type }) => type === 'Colony');
    }
    if (activeFilter === SEARCH_FILTERS.PEOPLE) {
      return results.filter(({ type }) => type === 'User');
    }
    if (activeFilter === SEARCH_FILTERS.PLACES) {
      return results.filter(({ type }) => type === 'Place');
    }
    if (activeFilter === SEARCH_FILTERS.GROUPS) {
      return results.filter(({ type }) => type === 'Group');
    }
    return results;
  }

  handleSearchTextChange(searchText) {
    this.setState({ searchText }, this.prepareForFetch);
  }

  handleFilterChange(filter) {
    this.setState({ activeFilter: filter });
  }

  render() {
    const { searchText, activeFilter, isLoading, error } = this.state;
    const results = this.getResults();
    return (
      <View style={styles.container}>
        <SearchInput
          value={searchText}
          onChange={this.handleSearchTextChange}
        />
        {!searchText && (
          <SearchColonyList
            colonies={[
              { section: 'Colonies You Might Like', category: 'Los Angeles', id: 'a', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Basketball' },
              { section: 'Colonies You Might Like', category: 'Los Angeles', id: 'b', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Dessert' },
              { section: 'Colonies You Might Like', category: 'Los Angeles', id: 'c', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Funk Fresh' },
              { section: 'Colonies You Might Like', category: 'Technology', id: 'd', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Apple' },
              { section: 'Colonies You Might Like', category: 'Technology', id: 'e', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Microsoft' },
              { section: 'Colonies You Might Like', category: 'Technology', id: 'f', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Facebook' },
              { section: 'Colonies You Might Like', category: 'Technology', id: 'g', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'React' },
              { section: 'Colonies You Might Like', category: 'Technology', id: 'h', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'React Native' },
              { section: 'Popular Colonies', category: 'Technology', id: 'd', imageUrl: 'http://cliqueimg.com/cache/posts/191064/the-celebrity-guide-to-shiny-healthy-hair-1748903-1461796710.480x480uc.jpg', name: 'Apple' },
            ]}
            onColonyPress={f => f}
          />
        )}
        {!!searchText && (
          <SearchFilterBar
            activeFilter={activeFilter}
            onChange={this.handleFilterChange}
          />
        )}
        {!!searchText && (
          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
            style={styles.searchResults}
            onErrorPress={this.prepareForFetch}
          />
        )}
      </View>
    );
  }
}

export default connectFeathers(SearchContainer);
