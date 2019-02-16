import React, { PropTypes } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Filter } from 'AppComponents';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

const renderFilterComponents = (imageSource, setImageFilter) => {
  const arrayOfFilters = [
    0,
    1,
    2,
    3,
    4,
    1,
    1,
  ];
  return _.map(arrayOfFilters, (item, index) => {
    const filter = `FILTER ${item}`;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setImageFilter(index === 0 ? '' : filter)}
        style={styles.filter}
      >
        <Filter filter={filter} style={styles.surface} width={50} height={50}>
          {imageSource}
        </Filter>
        <LabelText>{ index === 0 ? 'No Filter' : `Filter ${index}`}</LabelText>
      </TouchableOpacity>
    );
  });
}

export const PhotoEditControlView = ({ imageSource, setImageFilter }) => (
  <ScrollView contentContainerStyle={styles.container}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    bounces={false}
  >
    {renderFilterComponents(imageSource.uri, setImageFilter)}
  </ScrollView>
);

PhotoEditControlView.propTypes = {
  imageSource: PropTypes.any.isRequired,
  setImageFilter: PropTypes.func.isRequired,
};
