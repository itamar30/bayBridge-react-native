import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../components/CustomButton';
import colorsGuide from '../config/colorsGuide';
import WelcomeItem from '../components/WelcomeItem';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '983212679800-21t5mf5htn5q5shu2vcubrg01ijegamd.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <WelcomeItem
        title="Welcome Stranger!"
        desc="Please login to continue to the awesomeness"
      />
      <View style={styles.socialButtonsContainer}>
        <CustomButton
          facebookIconStyle={styles.facebookIcon}
          color="white"
          title="Login with Facebook"
          icon={require('../assets/facebook.png')}
          backgroundColor={colorsGuide.mediumBlue}
          iconSize={30}
          onPress={() => console.log('hello')}
        />
        <CustomButton
          color="white"
          title="Or with Google"
          icon={require('../assets/google.png')}
          backgroundColor={colorsGuide.mediumRed}
          iconSize={35}
          onPress={() =>
            onGoogleButtonPress().then(() => {
              navigation.navigate('MoviesList', user);
            })
          }
        />
      </View>
      <CustomButton
        style={styles.facebookIcon}
        color="white"
        title="Continue"
        icon={require('../assets/facebook.png')}
        backgroundColor={colorsGuide.black}
        iconSize={30}
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
  facebookIcon: {
    marginBottom: 7,
  },
});
