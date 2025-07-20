import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  data: [],
  fetchLoading: false,
  toggleLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async ({ text, status }, thunkAPI) => {
    let endpoint = '/todos/get';

    const queryParams = [];

    if (text) {
      queryParams.push(`search=${encodeURIComponent(text)}`);
    }
    if (status) {
      queryParams.push(`status=${encodeURIComponent(status)}`);
    }

    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }

    try {
      const response = await api.get(endpoint);
      return response?.data?.todos;
    } catch (error) {
      console.log('Error fetching todos: ', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const toggleTodoStatus = createAsyncThunk(
  'todo/toggleTodoStatus', async (id, thunkAPI) => {
    try {
      const response = await api.patch(`/todos/toggle/${id}`);
      return response?.data?.todo;
    } catch (error) {
      console.log('Error toggling todo status: ', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleTodoStatus.pending, state => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(toggleTodoStatus.fulfilled, (state, action) => {
        state.toggleLoading = false;
        const updatedTodo = action.payload;
        state.data = state.data.map(todo =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      })
      .addCase(toggleTodoStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      })
  },
});

export default todoSlice.reducer;
