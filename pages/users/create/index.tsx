import AdminLayout from '../../../components/layouts/admin';
import ManageUserForm from '../../../components/users/ManageUserForm';
import { useAppSelector } from '../../../redux/hooks';
import { TUsersState } from '../../../redux/types';

const CreateCategory = () => {
  const title = 'Создание пользователя';
  const { saveLoading } = useAppSelector<TUsersState>(
    (state) => state.products,
  );

  return (
    <ManageUserForm
      title={title}
      editMode={false}
      user={null}
      isLoading={false}
      isSaveLoading={saveLoading}
    />
  );
};

CreateCategory.PageLayout = AdminLayout;

export default CreateCategory;
