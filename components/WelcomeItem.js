import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';

const WelcomeItem = ({
  title,
  desc,
  isGoogle,
  isFaceBook,
  image,
  color,
  fontSize,
}) => {
  useEffect(() => {}, [isGoogle, isFaceBook]);
  return (
    <View style={styles.container}>
      {<Text style={[styles.title, {color}]}>{title}</Text>}
      {!isFaceBook && !isGoogle && (
        <Image
          style={styles.strangerImage}
          source={require('../assets/user.png')}
        />
      )}
      {isFaceBook && <Image style={styles.img} source={{uri: image}} />}
      {isGoogle && (
        <Image
          style={styles.img}
          source={require('../assets/googleUser.png')}
        />
      )}
      {!isGoogle && !isFaceBook && <Text style={styles.desc}>{desc}</Text>}
    </View>
  );
};

export default WelcomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    fontSize: 30,
    marginVertical: 3,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 3,
  },
  desc: {
    fontSize: 20,
    width: '90%',
    textAlign: 'center',
    marginVertical: 3,
  },
  strangerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 3,
  },
});
