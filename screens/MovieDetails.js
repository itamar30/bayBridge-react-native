import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import colorsGuide from '../config/colorsGuide';
import MovieItemWithDetails from '../components/MovieItemWithDetails';

const MovieDetails = ({route, navigation}) => {
  const {id, title, overview, vote_average, poster_path} = route.params[0];

  useEffect(() => {}, [id]);

  return (
    <View style={styles.container}>
      <MovieItemWithDetails
        id={id}
        name={title}
        desc={overview}
        raiting={vote_average}
        poster={`https://image.tmdb.org/t/p/original${poster_path}`}
      />
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsGuide.white,
  },
  text: {
    fontSize: 30,
  },
});
