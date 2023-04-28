import {View, Text, StyleSheet, FlatList, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import colorsGuide from '../config/colorsGuide';
import CustomButton from '../components/CustomButton';
import MovieItem from '../components/MovieItem';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const MoviesList = ({route}) => {
  const navigation = useNavigation();
  const [allMovies, setallMovies] = useState([]);
  const [filteredMovies, setFilterdMovies] = useState([]);
  const [moviesFetchFlag, setmMviesFetchFlag] = useState(false);
  const [isSearchEmpty, setisSearchEmpty] = useState(true);

  const getAllMovies = async ({route}) => {
    const res = await axios(
      'https://api.themoviedb.org/3/movie/popular?api_key=247082c0fd9674d69377c506d2b38e04&amp;amp;language=en-US&amp;amp;page=1',
    );
    setallMovies(res.data.results);
    setmMviesFetchFlag(true);
  };

  useEffect(() => {}, [route.params?.name]);

  const renderItem = ({item}) => {
    return (
      <MovieItem
        key={item.id}
        name={capital_letter(item?.original_title)}
        poster={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
        onPress={() => {
          navigation.navigate('MovieDetails', fintMovieById(item?.id));
        }}
      />
    );
  };

  const fintMovieById = id => {
    return allMovies.filter(item => item?.id === id);
  };

  const capital_letter = str => {
    str = str?.split(' ');
    for (var i = 0, x = str.length; i < x; i++) {
      let first = str[i][0]?.toUpperCase();
      let rest = str[i]?.substr(1);
      if (first == undefined) {
        str[i] = rest;
      }
      if (rest === undefined) {
        str[i] = first;
      }
      if (first !== undefined && rest !== undefined) {
        str[i] = first + rest;
      }
    }
    return str.join(' ');
  };

  const HandleonChangeText = e => {
    if (e !== '') {
      setisSearchEmpty(false);
    } else {
      setisSearchEmpty(true);
    }
    setFilterdMovies(
      allMovies.filter(m => m?.original_title?.includes(capital_letter(e))),
    );
  };

  return (
    <View style={[styles.container, {paddingTop: !moviesFetchFlag ? 100 : 40}]}>
      {!moviesFetchFlag && (
        <View style={styles.buttonContainer}>
          <Text style={styles.username}>Logged as {route.params.name}</Text>
          {route.params.image ? (
            <Image
              style={[styles.facebookImg, {marginVertical: 30}]}
              source={{uri: route.params.image}}
            />
          ) : (
            <Image
              style={[styles.facebookImg, {marginVertical: 30}]}
              source={require('../assets/googleUser.png')}
            />
          )}
          <CustomButton
            style={{borderColor: colorsGuide.white, borderWidth: 1}}
            width={200}
            color="white"
            title="Movies List"
            icon={require('../assets/list.png')}
            backgroundColor={colorsGuide.black}
            iconSize={35}
            onPress={getAllMovies}
          />
        </View>
      )}
      {moviesFetchFlag && (
        <TextInput
          placeholder="Serach Movie .."
          placeholderTextColor={'gray'}
          style={styles.searchBar}
          onChangeText={e => HandleonChangeText(e)}
        />
      )}

      {filteredMovies?.length > 0 && !isSearchEmpty && (
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={filteredMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      )}
      {filteredMovies?.length === 0 && !isSearchEmpty && (
        <View>
          <Text style={styles.noResult}>No Results Try Search Again ..</Text>
        </View>
      )}

      {isSearchEmpty && (
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={allMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: colorsGuide.black,
  },

  text: {
    fontSize: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  facebookImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  searchBar: {
    height: 60,
    width: '80%',
    color: colorsGuide.white,
    backgroundColor: colorsGuide.blackWithOpacity,
    borderWidth: 1,
    borderColor: colorsGuide.white,
    borderRadius: 20,
    fontSize: 28,
    marginVertical: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  noResult: {
    fontSize: 25,
    color: colorsGuide.white,
    textAlign: 'center',
  },
});
