import AdminLayout from '../../../components/layouts/admin';
import ManageProductForm from '../../../components/products/ManageProductForm';
import { useAppSelector } from '../../../redux/hooks';
import { TCategoriesState, TProductsState } from '../../../redux/types';

const CreateProdcut = () => {
  const title = 'Создание товара';
  const { saveLoading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );
  const { categories } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );

  return (
    <ManageProductForm
      title={title}
      editMode={false}
      product={null}
      categories={categories}
      isLoading={false}
      isSaveLoading={saveLoading}
    />
  );
};

CreateProdcut.PageLayout = AdminLayout;

export default CreateProdcut;
