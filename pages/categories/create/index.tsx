import { useEffect } from 'react';
import ManageCategoryForm from '../../../components/categories/MangageCategoryForm';
import AdminLayout from '../../../components/layouts/admin';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchLanguages } from '../../../redux/slicers/languageSlicer';
import { TCategoriesState, TLanguageState } from '../../../redux/types';

const CreateCategory = () => {
  const title = 'Создание категории';
  const dispatch = useAppDispatch();
  const { saveLoading } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );
  const { languages } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  return (
    <ManageCategoryForm
      title={title}
      languages={languages}
      editMode={false}
      category={null}
      isLoading={false}
      isSaveLoading={saveLoading}
    />
  );
};

CreateCategory.PageLayout = AdminLayout;

export default CreateCategory;
