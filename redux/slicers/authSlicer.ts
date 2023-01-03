import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handlePending } from '../../common/helpers';
import { IUser } from '../../common/interfaces';
import { TAuthState } from '../types';

import { toast } from 'react-toastify';
import {
  getUserInfo,
  setAccessToken,
} from '../../common/helpers/jwt-token.helper';
import { AuthService, OpenAPI } from '../../swagger/autogen';

export const signin = createAsyncThunk<
  { accessToken: string },
  { login: string; password: string },
  { rejectValue: string }
>('auth/signin', async function (payload) {
  return await AuthService.login(payload);
});

const initialState: TAuthState = {
  user: null,
  loading: false,
};

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state: TAuthState) {
      state.user = null;
      localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');
    },
    setUser(state: TAuthState, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        setAccessToken(action.payload.accessToken);
        state.user = getUserInfo();
        OpenAPI.TOKEN = action.payload.accessToken;
        // localStorage.setItem('refreshToken', action.payload.refreshToken);
        toast.info('Вы успешно авторизованы!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === 'Unauthorized.') {
          toast.error('Неверный логин или пароль', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Ошибка на сервере. Обратитесь к администратору.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log('rejected');
      });
  },
});

export const { signout, setUser } = authSlicer.actions;

export default authSlicer.reducer;
