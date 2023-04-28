import { StyleSheet, Text, View } from "react-native";
import MoviesList from "./screens/MoviesList";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import Favorites from "./screens/Favorites";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from "./store/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
    name="Home"
    component={Home}
    options={{ headerShown: false }}
    />
    <Stack.Screen
    name="MoviesList"
    component={MoviesList}
    options={{ headerShown: false }}
    />
    <Stack.Screen
    name="MovieDetails"
    component={MovieDetails}
    options={{ headerShown: false }}
    />
    <Stack.Screen
     name="Favorites"
     component={Favorites}
     options={{ headerShown: false }}
   />
  </Stack.Navigator>
  </NavigationContainer>
  </Provider>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
