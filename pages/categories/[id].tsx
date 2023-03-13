import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ManageCategoryForm from '../../components/categories/MangageCategoryForm';
import AdminLayout from '../../components/layouts/admin';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearCategory,
  fetchCategory,
} from '../../redux/slicers/categorySlicer';
import { fetchLanguages } from '../../redux/slicers/languageSlicer';
import { TCategoriesState, TLanguageState } from '../../redux/types';

const EditCategory = () => {
  const title = 'Редактирование категории';
  const router = useRouter();
  const { category, loading, saveLoading } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );
  const { languages } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        await dispatch(fetchLanguages());
        await dispatch(fetchCategory(router.query.id as any));
      }
    })();

    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch, router.query]);

  return (
    <ManageCategoryForm
      title={title}
      editMode={true}
      category={category}
      languages={languages}
      isLoading={loading}
      isSaveLoading={saveLoading}
    />
  );
};

EditCategory.PageLayout = AdminLayout;

export default EditCategory;
