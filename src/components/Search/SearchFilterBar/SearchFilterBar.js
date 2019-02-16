import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SEARCH_FILTERS } from 'AppConstants';
import { styles } from './styles';

export class SearchFilterBar extends Component {
  static propTypes = {
    activeFilter: PropTypes.string.isRequired,
    style: View.propTypes.style,
    onChange: PropTypes.func.isRequired,
  }

  getFilters() {
    return [
      SEARCH_FILTERS.ALL,
      SEARCH_FILTERS.COLONIES,
      SEARCH_FILTERS.PEOPLE,
      SEARCH_FILTERS.PLACES,
      SEARCH_FILTERS.GROUPS,
    ];
  }

  getFilterContainerStyle(filter) {
    // Filter "All" needs less space
    if (filter === SEARCH_FILTERS.ALL) {
      return [styles.filterContainer, { flex: 0.8 }];
    }
    // Filter "Colonies" needs more space
    if (filter === SEARCH_FILTERS.COLONIES) {
      return [styles.filterContainer, { flex: 1.2 }];
    }
    // The last filter shouldn't have a right border
    const filters = this.getFilters();
    if (filter === filters[filters.length - 1]) {
      return [styles.filterContainer, { borderRightWidth: 0 }];
    }
    return styles.filterContainer;
  }

  getFilterStyle(filter) {
    if (filter === this.props.activeFilter) {
      return [styles.filter, styles.activeFilter];
    }
    return styles.filter;
  }

  handleFilterChange(filter) {
    return () => {
      this.props.onChange(filter);
    };
  }

  render() {
    const { activeFilter, style, onChange } = this.props;
    return (
      <View style={style}>
        <View style={styles.container}>
          {this.getFilters().map(filter => (
            <TouchableOpacity
              key={filter}
              style={this.getFilterContainerStyle(filter)}
              onPress={this.handleFilterChange(filter)}
            >
              <Text style={this.getFilterStyle(filter)}>
                {filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
