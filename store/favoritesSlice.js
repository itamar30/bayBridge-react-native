import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const found = state.ids.indexOf(action.payload);

      if (found === -1) {
        state.ids.push(action.payload);
      } else {
        console.log('item was already added');
      }
    },
    clearFavorites: () => {
      state.ids = [];
    },
    removeFavorite: (state, action) => {
      const found = state.ids.indexOf(action.payload);
      if (found !== -1) {
        state.ids.splice(state.ids.indexOf(action.payload), 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {addFavorite, clearFavorites, removeFavorite} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
