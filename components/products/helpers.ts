import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import {
  createProduct,
  deleteProduct,
  editProduct,
} from '../../redux/slicers/productSlicer';
import { AppDispatch } from '../../redux/store';
import { Product } from '../../swagger/autogen';
import { handleSignout } from '../layouts/admin/helpers';

const handleChangeClick = (id: number, router: NextRouter) => () => {
  router.push(`/products/${id}`);
};

const handleCreateClick = (router: NextRouter) => () => {
  router.push(`/products/create`);
};

const handleUploadClick = (router: NextRouter) => () => {
  router.push(`/products/upload`);
};

const handleDeleteClick =
  (product: Product, setCurProduct: Dispatch<SetStateAction<Product | null>>) =>
    () => {
      setCurProduct(product);
    };

const onSubmit =
  (id: number, editMode: boolean, router: NextRouter, dispatch: AppDispatch) =>
    async (values: any) => {
      if (editMode) {
        const result = (await dispatch(
          editProduct({
            id, product: {
              ...values,
              price: Number(values.price)
            }
          }),
        )) as any;

        if (result.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }
      } else {
        const result = (await dispatch(createProduct(values))) as any;

        if (result.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }
      }

      router.push('/products');
    };

const handleConfirm =
  (
    curProduct: Product | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurProduct: Dispatch<SetStateAction<Product | null>>,
  ) =>
    async () => {
      const deleteRes = (await dispatch(deleteProduct(curProduct!.id))) as any;

      if (deleteRes.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }

      setCurProduct(null);
    };

const handleClose =
  (setCurProduct: Dispatch<SetStateAction<Product | null>>) => () => {
    setCurProduct(null);
  };

export {
  handleChangeClick,
  handleCreateClick,
  handleUploadClick,
  handleDeleteClick,
  handleConfirm,
  handleClose,
  onSubmit,
};
