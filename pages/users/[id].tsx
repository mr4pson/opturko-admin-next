import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/layouts/admin';
import ManageUserForm from '../../components/users/ManageUserForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearUser, fetchUser } from '../../redux/slicers/userSlicer';
import { TUsersState } from '../../redux/types';

const EditCategory = () => {
  const title = 'Редактирование пользователя';
  const router = useRouter();
  const { user, loading, saveLoading } = useAppSelector<TUsersState>(
    (state) => state.users,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        await dispatch(fetchUser(router.query.id as any));
      }
    })();

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, router.query]);

  return (
    <ManageUserForm
      title={title}
      editMode={true}
      user={user}
      isLoading={loading}
      isSaveLoading={saveLoading}
    />
  );
};

EditCategory.PageLayout = AdminLayout;

export default EditCategory;
