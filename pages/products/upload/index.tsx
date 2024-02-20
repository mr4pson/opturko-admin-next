import AdminLayout from '../../../components/layouts/admin';
import UploadProductsForm from '../../../components/products/UploadProductsForm';
import { useAppSelector } from '../../../redux/hooks';
import { TProductsState } from '../../../redux/types';

const UploadProducts = () => {
  const { saveLoading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );

  return (
    <UploadProductsForm
      isSaveLoading={saveLoading}
    />
  );
};

UploadProducts.PageLayout = AdminLayout;

export default UploadProducts;
