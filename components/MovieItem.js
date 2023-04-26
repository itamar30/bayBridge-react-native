import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colorsGuide from '../config/colorsGuide';
const MovieItem = ({name, poster, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.img}
        source={{
          uri: poster,
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsGuide.mediumBlue,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colorsGuide.black,
    marginHorizontal: 10,
  },
  img: {
    height: 200,
    width: 140,
    resizeMode: 'cover',
    position: 'relative',
  },
  titleContainer: {
    backgroundColor: colorsGuide.blackWithOpacity,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: '25%',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    padding: 6,
    textAlign: 'center',
  },
});
