import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleChangePending, handlePending } from '../../common/helpers';
import { TCategoriesState } from '../types';

import { toast } from 'react-toastify';
import {
  CategoriesService,
  Category,
  CreateCategoryDto,
} from '../../swagger/autogen';

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>('categories/fetchCategories', async function () {
  return await CategoriesService.getCategories();
});

export const fetchCategoriesBySection = createAsyncThunk<
  Category[],
  string,
  { rejectValue: string }
>('categories/fetchCategoriesBySection', async function (section) {
  return await CategoriesService.getCategoriesBySection(section);
});

export const fetchCategory = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>('categories/fetchCategory', async function (id): Promise<any> {
  return await CategoriesService.getCategoryById(id);
});

export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryDto,
  { rejectValue: string }
>('categories/createCategory', async function (payload): Promise<any> {
  return await CategoriesService.createCategory(payload);
});

export const editCategory = createAsyncThunk<
  Category,
  { id: number; category: Category },
  { rejectValue: string }
>(
  'categories/editCategory',
  async function (payload: { id: number; category: Category }): Promise<any> {
    return await CategoriesService.updateCategory(payload.id, payload.category);
  },
);

export const deleteCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('categories/deleteCategory', async function (id) {
  return await CategoriesService.deleteCategory(id);
});

const initialState: TCategoriesState = {
  categories: [],
  category: null,
  loading: false,
  saveLoading: false,
};

const categorySlicer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = initialState.categories;
    },
    clearCategory(state) {
      state.category = initialState.category;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchCategories.rejected, (state, action) => {
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
      //fetchCategoriesBySection
      .addCase(fetchCategoriesBySection.pending, handlePending)
      .addCase(fetchCategoriesBySection.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchCategoriesBySection.rejected, (state, action) => {
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
      //fetchCategory
      .addCase(fetchCategory.pending, handlePending)
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        console.log('fulfilled');
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Не удалось получить категорию. Обратитесь к администратору.',
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
        console.log('rejected');
      })
      //createCategory
      .addCase(createCategory.pending, handleChangePending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.categories = [...state.categories, action.payload];
        toast.info('Категория успешно создана.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(createCategory.rejected, (state, action) => {
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
      //editCategory
      .addCase(editCategory.pending, handleChangePending)
      .addCase(editCategory.fulfilled, (state, action) => {
        state.saveLoading = false;
        let category = state.categories.find(
          (category) => category!.id === action.payload.id,
        );
        category = {
          ...category,
          ...action.payload,
        };
        toast.info('Категория успешно изменена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(editCategory.rejected, (state, action) => {
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
      //deleteCategory
      .addCase(deleteCategory.pending, handleChangePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => +item!.id !== +action.payload,
        );
        state.saveLoading = false;
        toast.info('Категория успешно удалена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
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

export const { clearCategories, clearCategory } = categorySlicer.actions;

export default categorySlicer.reducer;
