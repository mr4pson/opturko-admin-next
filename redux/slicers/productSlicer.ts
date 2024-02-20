import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleChangePending, handlePending } from '../../common/helpers';
import { TProductsState } from '../types';

import { toast } from 'react-toastify';
import {
  CreateProductDto,
  IPaginationResponse,
  Product,
  ProductsService,
} from '../../swagger/autogen';

export const fetchProducts = createAsyncThunk<
  IPaginationResponse,
  { code?: number; brand?: string; priceFrom: number | undefined; priceTo: number | undefined; skip: number; limit: number },
  { rejectValue: string }
>('products/fetchProducts', async function ({ code, brand, priceFrom, priceTo, skip, limit }) {
  return await ProductsService.getProducts(skip, limit, priceFrom, priceTo, code, brand);
});

export const fetchProductsByCategory = createAsyncThunk<
  IPaginationResponse,
  { id: number; code?: number; brand?: string; priceFrom: number | undefined; priceTo: number | undefined; skip: number; limit: number },
  { rejectValue: string }
>('products/fetchProductsByCategory', async function ({ id, code, brand, priceFrom, priceTo, skip, limit }) {
  return await ProductsService.getProductsByCategory(
    id,
    skip,
    limit,
    priceFrom,
    priceTo,
    code,
    brand,
  );
});

export const fetchProduct = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>('products/fetchProduct', async function (id): Promise<any> {
  return await ProductsService.getProductById(id);
});

export const createProduct = createAsyncThunk<
  Product,
  CreateProductDto,
  { rejectValue: string }
>('products/createProduct', async function (payload): Promise<any> {
  return await ProductsService.createProduct(payload);
});

export const editProduct = createAsyncThunk<
  Product,
  { id: number; product: CreateProductDto },
  { rejectValue: string }
>(
  'products/editProduct',
  async function (payload: {
    id: number;
    product: CreateProductDto;
  }): Promise<any> {
    return await ProductsService.updateProduct(payload.id, payload.product);
  },
);

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('products/deleteProduct', async function (id) {
  return await ProductsService.deleteProduct(id);
});

export const uploadProducts = createAsyncThunk<
  any,
  { csvFile: string, images: any[] },
  { rejectValue: string }
>('products/uploadProduct', async function (payload) {
  return await ProductsService.uploadProducts(payload);
});

const initialState: TProductsState = {
  products: [],
  totalLength: 0,
  product: null,
  loading: false,
  saveLoading: false,
};

const productSlicer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts(state) {
      state.products = initialState.products;
      state.totalLength = initialState.totalLength;
    },
    clearProduct(state) {
      state.product = initialState.product;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchProducts
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data as unknown as Product[];
        state.totalLength = action.payload.totalLength;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
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
      //fetchProducts
      .addCase(fetchProductsByCategory.pending, handlePending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.data as unknown as Product[];
        state.totalLength = action.payload.totalLength;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
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
      //fetchProduct
      .addCase(fetchProduct.pending, handlePending)
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        console.log('fulfilled');
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        toast.error('Не удалось получить товар. Обратитесь к администратору.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('rejected');
      })
      //createProduct
      .addCase(createProduct.pending, handleChangePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.products = [...state.products, action.payload];
        toast.info('Товар успешно создан.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(createProduct.rejected, (state, action) => {
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
      //editProduct
      .addCase(editProduct.pending, handleChangePending)
      .addCase(editProduct.fulfilled, (state, action) => {
        state.saveLoading = false;
        let product = state.products.find(
          (product) => product!.id === action.payload.id,
        );
        product = {
          ...product,
          ...action.payload,
        };
        toast.info('Категория успешно изменена.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(editProduct.rejected, (state, action) => {
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
      //deleteProduct
      .addCase(deleteProduct.pending, handleChangePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => +item!.id !== +action.payload,
        );
        state.saveLoading = false;
        toast.info('Товар успешно удален.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
      })
      //uploadProducts
      .addCase(uploadProducts.pending, handleChangePending)
      .addCase(uploadProducts.fulfilled, (state, action) => {
        state.saveLoading = false;
        toast.info('Товары успешно загружены.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('fulfilled');
      })
      .addCase(uploadProducts.rejected, (state, action) => {
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

export const { clearProducts, clearProduct } = productSlicer.actions;

export default productSlicer.reducer;
