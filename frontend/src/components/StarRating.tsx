import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const StarRating = ({ maxRating = 5, onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleClick(index + 1)}
        >
          <Icon
            name={index < rating ? 'star-fill' : 'star'}
            type='octicon'
            color='#F9BC60'
            size={54}
            containerStyle={styles.icon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default StarRating;
