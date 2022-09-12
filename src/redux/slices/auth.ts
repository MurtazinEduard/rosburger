import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IState } from '../store';
import { ILoginUser, IRegisterUser, IUserData, IUserSlice } from '../types';

export const fetchAuth = createAsyncThunk<
  IUserData,
  ILoginUser,
  { rejectValue: string }
>('auth/fetchAuth', async (params, { rejectWithValue }) => {
  const response: any = await axios.post<IUserData>('/auth/login', params);
  if (!response.data) {
    return rejectWithValue('Не удалось авторизоваться');
  }
  return response.data;
});

export const fetchRegister = createAsyncThunk<
  IUserData,
  IRegisterUser,
  { rejectValue: string }
>('auth/fetchRegister', async (params, { rejectWithValue }) => {
  const { data } = await axios.post<IUserData>('/auth/register', params);
  if (!data) {
    return rejectWithValue('Не удалось зарегистрироваться');
  }
  return data;
});

export const fetchAuthMe = createAsyncThunk<
  IUserData,
  undefined,
  { rejectValue: string }
>('auth/fetchAuthMe', async (_, { rejectWithValue }) => {
  const { data } = await axios.get<IUserData>('/auth/me');
  if (!data) {
    return rejectWithValue('Не удалось получить пользователя');
  }
  return data;
});

const initialState: IUserSlice = {
  data: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectIsAuth = (state: IState) => Boolean(state.auth.data);
export const selectUser = (state: IState) => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
