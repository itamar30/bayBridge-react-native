import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colorsGuide from '../config/colorsGuide';
import {useSelector, useDispatch} from 'react-redux';
import {
  addFavorite,
  clearFavorites,
  removeFavorite,
} from '../store/favoritesSlice';
import {useNavigation} from '@react-navigation/native';

const MovieItemWithDetails = ({id, name, poster, desc, raiting}) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const starArr = [];
  const raitingFloor = Math.floor(raiting);
  const ids = useSelector(state => state.favorites.ids);
  const isMovieFavorite = ids.indexOf(id) !== -1;

  for (let i = 0; i < raitingFloor; i++) {
    starArr.push(0);
  }
  const renderFullStars = starArr.map(item => (
    <View key={Math.random()}>
      <Image source={require('../assets/star.png')} style={styles.starIcon} />
    </View>
  ));

  useEffect(() => {}, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <View style={styles.startsContainer}>
              {renderFullStars}
              {raiting - raitingFloor > 0 && (
                <View style={{zIndex: 2}}>
                  <Image
                    source={require('../assets/halfstar.png')}
                    style={styles.starIcon}
                  />
                </View>
              )}
            </View>
          </View>
          <Image
            style={styles.img}
            source={{
              uri: poster,
            }}
          />
          {!isMovieFavorite ? (
            <TouchableOpacity
              style={styles.favContainer}
              onPress={() => {
                {
                  ids?.length === 0 &&
                    Alert.alert('Press Cart Icon To See Favorites Movies');
                }
                dispatch(addFavorite(id));
              }}>
              <Image
                source={require('../assets/plus.png')}
                style={styles.plusAndMinusIcons}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.favContainer}
              onPress={() => dispatch(removeFavorite(id))}>
              <Image
                source={require('../assets/minus.png')}
                style={styles.plusAndMinusIcons}
              />
            </TouchableOpacity>
          )}
          <View style={styles.badgeContainer}>
            <View style={styles.numOfFavoriteCircle}>
              <Text style={styles.favoritesNumber}>
                {`${ids?.length || 0}`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.shoppingCartBadgeContainer}
              onPress={() => navigate.navigate('Favorites')}>
              <Image
                source={require('../assets/cart.png')}
                style={styles.cartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieItemWithDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    minHeight: '100%',
    backgroundColor: colorsGuide.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderColor: colorsGuide.black,
    borderWidth: 1,
    position: 'relative',
    height: '90%',
    width: '80%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  startsContainer: {
    flexDirection: 'row',
    zIndex: 2,
  },
  raitingText: {
    fontSize: 30,
    zIndex: 2,
  },
  name: {
    zIndex: 2,
    fontSize: 30,
    fontWeight: 'bold',
    color: colorsGuide.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    zIndex: 2,
    textAlign: 'center',
    fontSize: 15,
    color: colorsGuide.white,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-evenly',
    bottom: 0,
    zIndex: 2,
    width: '100%',
    backgroundColor: colorsGuide.blackWithOpacity,
    overflow: 'hidden',
    padding: 20,
  },
  favContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 25,
    right: 15,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingCartBadgeContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 25,
    left: 15,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    zIndex: 3,
    height: 100,
    width: 100,
    position: 'relative',
  },
  numOfFavoriteCircle: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 3,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesNumber: {
    fontSize: 25,
    color: colorsGuide.white,
    fontWeight: 'bold',
  },
  starIcon: {
    height: 30,
    width: 30,
  },
  plusAndMinusIcons: {
    height: 42,
    width: 42,
    backgroundColor: 'white',
    borderRadius: 21,
  },
  cartIcon: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 25,
  },
});
