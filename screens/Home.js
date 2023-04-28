import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../components/CustomButton';
import colorsGuide from '../config/colorsGuide';
import WelcomeItem from '../components/WelcomeItem';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const Home = () => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [isFacebook, setIsFacebook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '983212679800-21t5mf5htn5q5shu2vcubrg01ijegamd.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [user]);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignOut = () => {
    setIsGoogle(false);
    return auth().signOut();
  };

  const facebookSignOut = () => {
    setIsFacebook(false);
    return auth().signOut();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: user ? colorsGuide.black : colorsGuide.white},
      ]}>
      <WelcomeItem
        title={user ? `Welcome ${user?.displayName}` : `Welcome Stranger`}
        color={user ? 'gray' : user && colorsGuide.black}
        desc="Please login to continue to the awesomeness"
        image={image}
        isGoogle={isGoogle}
        isFaceBook={isFacebook}
      />
      {!user && (
        <View style={styles.socialButtonsContainer}>
          <CustomButton
            style={{marginHorizontal: 5}}
            color="white"
            title={'Or with Google'}
            icon={require('../assets/google.png')}
            backgroundColor={colorsGuide.mediumRed}
            iconSize={30}
            onPress={() =>
              onGoogleButtonPress().then(user => {
                setName(user.additionalUserInfo.profile.name);
                setIsGoogle(true);
                navigation.navigate('MoviesList', {
                  name: user.additionalUserInfo.profile.name,
                });
              })
            }
          />
          <CustomButton
            facebookIconStyle={styles.facebookIcon}
            color="white"
            title="Login with Facebook"
            icon={require('../assets/facebook.png')}
            backgroundColor={colorsGuide.mediumBlue}
            iconSize={20}
            onPress={() =>
              onFacebookButtonPress()
                .then(res => {
                  setName(res.additionalUserInfo.profile.name);
                  setImage(res.additionalUserInfo.profile.picture.data.url);
                  setIsFacebook(true);
                  navigation.navigate('MoviesList', {
                    name: res.additionalUserInfo.profile.name,
                    image: res?.additionalUserInfo?.profile?.picture?.data?.url,
                  });
                })
                .catch(error => console.log(error))
            }
          />
        </View>
      )}
      {user && (
        <CustomButton
          width="40%"
          color="white"
          title={'Log Out'}
          icon={
            isGoogle
              ? require('../assets/google.png')
              : require('../assets/facebook.png')
          }
          backgroundColor={
            isGoogle ? colorsGuide.mediumRed : colorsGuide.mediumBlue
          }
          iconSize={isGoogle ? 30 : 20}
          onPress={isGoogle ? googleSignOut : facebookSignOut}
        />
      )}
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
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 10,
  },
  facebookIcon: {
    marginBottom: 7,
  },
});
