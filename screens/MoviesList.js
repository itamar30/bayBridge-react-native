import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import colorsGuide from '../config/colorsGuide';
import CustomButton from '../components/CustomButton';
import MovieItem from '../components/MovieItem';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const MoviesList = ({route}) => {
  const navigation = useNavigation();
  const email = route?.params?.email;
  const [allMovies, setallMovies] = useState([]);
  const [moviesFetchFlag, setmMviesFetchFlag] = useState(false);

  const getAllMovies = async ({route}) => {
    const res = await axios(
      'https://api.themoviedb.org/3/movie/popular?api_key=247082c0fd9674d69377c506d2b38e04&amp;amp;language=en-US&amp;amp;page=1',
    );
    setallMovies(res.data.results);
    setmMviesFetchFlag(true);
  };

  useEffect(() => {}, [moviesFetchFlag, email]);

  const renderItem = ({item}) => {
    return (
      <MovieItem
        key={item.id}
        name={item?.original_title}
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

  return (
    <View style={[styles.container, {paddingTop: !moviesFetchFlag ? 300 : 40}]}>
      {!moviesFetchFlag && (
        <View style={styles.buttonContainer}>
          {email && <Text style={styles.username}>Hello {email}</Text>}
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
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={allMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
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
});
