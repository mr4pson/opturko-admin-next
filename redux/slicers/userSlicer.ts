import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleChangePending, handlePending } from '../../common/helpers';
import { TUsersState } from '../types';

import { toast } from 'react-toastify';
import { AuthService, RegistrationDto, User } from '../../swagger/autogen';

export const fetchUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>('users/fetchUsers', async function () {
  return await AuthService.getUsers();
});

export const fetchUser = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>('users/fetchUser', async function (id): Promise<any> {
  return await AuthService.getUserById(id);
});

export const createUser = createAsyncThunk<
  User,
  RegistrationDto,
  { rejectValue: string }
>('users/createUser', async function (payload): Promise<any> {
  return await AuthService.registrate(payload);
});

export const editUser = createAsyncThunk<
  User,
  { id: number; user: RegistrationDto },
  { rejectValue: string }
>(
  'users/editUser',
  async function (payload: {
    id: number;
    user: RegistrationDto;
  }): Promise<any> {
    return await AuthService.updateUser(payload.id, payload.user);
  },
);

export const deleteUser = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('users/deleteUser', async function (id) {
  return await AuthService.deleteUser(id);
});

const initialState: TUsersState = {
  users: [],
  user: null,
  loading: false,
  saveLoading: false,
};

const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = initialState.users;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchUsers
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === 'Unauthorized.') {
          toast.error('Вы неавторизованы.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Ошибка на сервере. Обратитесь к администратору.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log('rejected');
      })
      //fetchUser
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log('fulfilled');
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Не удалось получить пользователя. Обратитесь к администратору.',
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
        console.log('rejected');
      })
      //createUser
      .addCase(createUser.pending, handleChangePending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.users = [...state.users, action.payload];
        toast.info('Пользователь успешно создан.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.saveLoading = false;
        if (action.error.message === 'Unauthorized.') {
          toast.error('Вы неавторизованы.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Ошибка на сервере. Обратитесь к администратору.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log('rejected');
      })
      //editUser
      .addCase(editUser.pending, handleChangePending)
      .addCase(editUser.fulfilled, (state, action) => {
        state.saveLoading = false;
        let user = state.users.find((user) => user!.id === action.payload.id);
        user = {
          ...user,
          ...action.payload,
        };
        toast.info('Пользователь успешно изменена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(editUser.rejected, (state, action) => {
        state.saveLoading = false;
        if (action.error.message === 'Unauthorized.') {
          toast.error('Вы неавторизованы.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Ошибка на сервере. Обратитесь к администратору.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log('rejected');
      })
      //deleteUser
      .addCase(deleteUser.pending, handleChangePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (item) => +item!.id !== +action.payload,
        );
        state.saveLoading = false;
        toast.info('Пользователь успешно удален.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.saveLoading = false;
        console.log('rejected');

        if (action.error.message === 'Unauthorized.') {
          toast.error('Вы неавторизованы.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Ошибка на сервере. Обратитесь к администратору.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  },
});

export const { clearUsers, clearUser } = userSlicer.actions;

export default userSlicer.reducer;
