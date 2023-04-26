import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const WelcomeItem = ({title, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.img} source={require('../assets/user.png')} />
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

export default WelcomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  title: {
    fontSize: 40,
  },
  img: {
    height: 200,
    width: 200,
  },
  desc: {
    fontSize: 20,
    width: '70%',
  },
});
