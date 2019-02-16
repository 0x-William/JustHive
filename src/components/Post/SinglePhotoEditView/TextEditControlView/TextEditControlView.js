import React, { PropTypes } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

const Filter = ({ filter, label, setTextFilter, style }) => (
  <TouchableOpacity onPress={() => setTextFilter(filter)} style={[styles.filter]}>
    <View style={[styles.option, style]}>
      <Text style={[styles.text, {}]}>A</Text>
    </View>
    <LabelText>{label}</LabelText>
  </TouchableOpacity>
);

export function TextEditControlView({ setTextFilter, textFilter }) {
  const arrayOfFilters = [
    { filter: 'TEXT 1', label: 'Text 1' },
    { filter: 'TEXT 2', label: 'Text 2' },
    { filter: 'TEXT 3', label: 'Text 3' },
    { filter: 'TEXT 4', label: 'Text 4' },
    { filter: 'TEXT 5', label: 'Text 5' },
    { filter: 'TEXT 6', label: 'Text 6' },
    { filter: 'TEXT 7', label: 'Text 7' },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}
      horizontal={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
    {arrayOfFilters.map((filter, i) => (
      <Filter
        key={i}
        filter={filter.filter}
        label={filter.label}
        setTextFilter={setTextFilter}
        style={textFilter === filter.filter ? styles.selectedFilter : {}}
      />
    ))}
    </ScrollView>
  );
}

TextEditControlView.propTypes = {
  setTextFilter: PropTypes.func.isRequired,
  textFilter: PropTypes.string.isRequired,
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  style: View.propTypes.style,
};
