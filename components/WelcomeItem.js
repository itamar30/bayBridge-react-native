import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';

const WelcomeItem = ({title, desc, isGoogle, isFaceBook, image}) => {
  useEffect(() => {}, [isGoogle, isFaceBook]);
  return (
    <View style={styles.container}>
      {<Text style={styles.title}>{title}</Text>}
      {!isFaceBook && (
        <Image
          style={styles.strangerImage}
          source={require('../assets/user.png')}
        />
      )}
      {isFaceBook && <Image style={styles.img} source={{uri: image}} />}
      {!isGoogle && !isFaceBook && <Text style={styles.desc}>{desc}</Text>}
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
    borderRadius: 100,
  },
  desc: {
    fontSize: 20,
    width: '70%',
  },
  strangerImage: {
    height: 200,
    width: 200,
  },
});
