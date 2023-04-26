import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import colorsGuide from '../config/colorsGuide';
import WelcomeItem from '../components/WelcomeItem';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <WelcomeItem
        title="Welcome Stranger!"
        desc="Please login to continue to the awesomeness"
      />
      <View style={styles.socialButtonsContainer}>
        <CustomButton
          color="white"
          title="Login with Facebook"
          icon={require('../assets/facebook.png')}
          backgroundColor={colorsGuide.mediumBlue}
          iconSize={25}
          onPress={() => console.log('hello')}
        />
        <CustomButton
          color="white"
          title="Or with Google"
          icon={require('../assets/google.png')}
          backgroundColor={colorsGuide.mediumRed}
          iconSize={20}
          onPress={() => console.log('hello')}
        />
      </View>
      <CustomButton
        color="white"
        title="Continue"
        icon={require('../assets/facebook.png')}
        backgroundColor={colorsGuide.black}
        iconSize={20}
        onPress={() => navigation.navigate('MoviesList')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsGuide.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
