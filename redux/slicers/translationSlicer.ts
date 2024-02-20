import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handlePending } from '../../common/helpers';
import { TTranslationState } from '../types';

import { toast } from 'react-toastify';
import { Translation, TranslationsService } from '../../swagger/autogen';

export const fetchTranslation = createAsyncThunk<
  Translation,
  undefined,
  { rejectValue: string }
>('translations/fetchTranslation', async function () {
  return await TranslationsService.getTranslations();
});

export const initTranslation = createAsyncThunk<
  Translation,
  undefined,
  { rejectValue: string }
>('translations/initTranslation', async function () {
  return await TranslationsService.initTranslation();
});

export const updateTranslation = createAsyncThunk<
  Translation,
  Translation,
  { rejectValue: string }
>('translations/updateTranslation', async function (payload) {
  return await TranslationsService.updateTranslation(payload);
});

const initialState: TTranslationState = {
  translation: null,
  loading: false,
  saveLoading: false,
};

const translationSlicer = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    clearTranslation(state) {
      state.translation = initialState.translation;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchTranslation
      .addCase(fetchTranslation.pending, handlePending)
      .addCase(fetchTranslation.fulfilled, (state, action) => {
        state.translation = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchTranslation.rejected, (state, action) => {
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
      //initTranslation
      .addCase(initTranslation.pending, handlePending)
      .addCase(initTranslation.fulfilled, (state, action) => {
        state.translation = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(initTranslation.rejected, (state, action) => {
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
      });
  },
});

export const { clearTranslation } = translationSlicer.actions;

export default translationSlicer.reducer;
