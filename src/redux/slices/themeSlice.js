import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const systemColorScheme = Appearance.getColorScheme();

const initialState = {
  theme: systemColorScheme,
  useSystemTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.useSystemTheme = false;
    },
    toggleUseSystemTheme: state => {
      state.useSystemTheme = !state.useSystemTheme;
      if (state.useSystemTheme) {
        state.theme = Appearance.getColorScheme();
      }
    },
    updateSystemTheme: (state, action) => {
      if (state.useSystemTheme) {
        state.theme = action.payload;
      }
    },
  },
});

export const { setTheme, toggleUseSystemTheme, updateSystemTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
