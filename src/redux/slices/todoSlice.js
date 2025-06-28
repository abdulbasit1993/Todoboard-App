import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/todos/get');
      return response?.data?.todos;
    } catch (error) {
      console.log('Error fetching todos: ', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
