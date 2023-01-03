import ManageCategoryForm from '../../../components/categories/MangageCategoryForm';
import AdminLayout from '../../../components/layouts/admin';
import { useAppSelector } from '../../../redux/hooks';
import { TCategoriesState } from '../../../redux/types';

const CreateCategory = () => {
  const title = 'Создание категории';
  const { saveLoading } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );

  return (
    <ManageCategoryForm
      title={title}
      editMode={false}
      category={null}
      isLoading={false}
      isSaveLoading={saveLoading}
    />
  );
};

CreateCategory.PageLayout = AdminLayout;

export default CreateCategory;
