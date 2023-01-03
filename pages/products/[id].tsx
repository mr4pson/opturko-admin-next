import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/layouts/admin';
import ManageProductForm from '../../components/products/ManageProductForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearCategories,
  fetchCategories,
} from '../../redux/slicers/categorySlicer';
import { clearProduct, fetchProduct } from '../../redux/slicers/productSlicer';
import { TCategoriesState, TProductsState } from '../../redux/types';

const EditCategory = () => {
  const title = 'Редактирование товара';
  const router = useRouter();
  const { product, loading, saveLoading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );
  const { categories } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        await dispatch(fetchProduct(router.query.id as any));
      }
    })();

    return () => {
      dispatch(clearProduct());
      dispatch(clearCategories());
    };
  }, [dispatch, router.query]);

  return (
    <ManageProductForm
      title={title}
      editMode={true}
      product={product}
      categories={categories}
      isLoading={loading}
      isSaveLoading={saveLoading}
    />
  );
};

EditCategory.PageLayout = AdminLayout;

export default EditCategory;
