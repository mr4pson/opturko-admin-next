import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleChangePending, handlePending } from '../../common/helpers';
import { TLanguageState } from '../types';

import { toast } from 'react-toastify';
import {
  CreateLanguageDto,
  Language,
  LanguagesService,
} from '../../swagger/autogen';

export const fetchLanguages = createAsyncThunk<
  Language[],
  undefined,
  { rejectValue: string }
>('languages/fetchLanguages', async function () {
  return await LanguagesService.getLanguages();
});

export const fetchLanguage = createAsyncThunk<
  Language,
  number,
  { rejectValue: string }
>('languages/fetchLanguage', async function (id): Promise<any> {
  return await LanguagesService.getLanguageById(id);
});

export const createLanguage = createAsyncThunk<
  Language,
  CreateLanguageDto,
  { rejectValue: string }
>('languages/createLanguage', async function (payload): Promise<any> {
  return await LanguagesService.createLanguage(payload);
});

export const editLanguage = createAsyncThunk<
  Language,
  { id: number; language: Language },
  { rejectValue: string }
>(
  'languages/editLanguage',
  async function (payload: { id: number; language: Language }): Promise<any> {
    return await LanguagesService.updateLanguage(payload.id, payload.language);
  },
);

export const deleteLanguage = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('languages/deleteLanguage', async function (id) {
  return await LanguagesService.deleteLanguage(id);
});

const initialState: TLanguageState = {
  languages: [],
  language: null,
  loading: false,
  saveLoading: false,
};

const languageSlicer = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    clearLanguages(state) {
      state.languages = initialState.languages;
    },
    clearLanguage(state) {
      state.language = initialState.language;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchLanguages
      .addCase(fetchLanguages.pending, handlePending)
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
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
      //fetchLanguage
      .addCase(fetchLanguage.pending, handlePending)
      .addCase(fetchLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.language = action.payload;
        console.log('fulfilled');
      })
      .addCase(fetchLanguage.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Не удалось получить локализацию. Обратитесь к администратору.',
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
        console.log('rejected');
      })
      //createLanguage
      .addCase(createLanguage.pending, handleChangePending)
      .addCase(createLanguage.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.languages = [...state.languages, action.payload];
        toast.info('Локализация успешно создана.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(createLanguage.rejected, (state, action) => {
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
      //editLanguage
      .addCase(editLanguage.pending, handleChangePending)
      .addCase(editLanguage.fulfilled, (state, action) => {
        state.saveLoading = false;
        let language = state.languages.find(
          (language) => language!.id === action.payload.id,
        );
        language = {
          ...language,
          ...action.payload,
        };
        toast.info('Локализация успешно изменена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(editLanguage.rejected, (state, action) => {
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
      //deleteLanguage
      .addCase(deleteLanguage.pending, handleChangePending)
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.languages = state.languages.filter(
          (item) => +item!.id !== +action.payload,
        );
        state.saveLoading = false;
        toast.info('Локализация успешно удалена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(deleteLanguage.rejected, (state, action) => {
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

export const { clearLanguage, clearLanguages } = languageSlicer.actions;

export default languageSlicer.reducer;
