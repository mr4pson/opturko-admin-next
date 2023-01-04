import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../components/common';
import AdminLayout from '../../components/layouts/admin';
import { handleSignout } from '../../components/layouts/admin/helpers';
import { COLUMNS } from '../../components/users/constants';
import {
  handleChangeClick,
  handleClose,
  handleConfirm,
  handleCreateClick,
  handleDeleteClick,
} from '../../components/users/helpers';
import BreadCrumbs from '../../components/ui-kit/Breadcrumbs';
import Button from '../../components/ui-kit/Button';
import DataGrid from '../../components/ui-kit/DataGrid';
import Modal from '../../components/ui-kit/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearUsers, fetchUsers } from '../../redux/slicers/userSlicer';
import { TUsersState } from '../../redux/types';
import { User } from '../../swagger/autogen';

const UsersPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curUser, setCurUser] = useState<User | null>(null);
  const { users, loading } = useAppSelector<TUsersState>(
    (state) => state.users,
  );

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const result = (await dispatch(fetchUsers())) as any;

        if (result.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }
      })();

      return () => {
        dispatch(clearUsers());
      };
    });
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Opturko | Администрирование</title>
        <meta name="description" content="Opturko | Администрирование" />
      </Head>
      <PageTitle>
        Пользователи
        <Button width={250} onClick={handleCreateClick(router)}>
          Создать пользователя
        </Button>
      </PageTitle>
      <BreadCrumbs />
      <DataGrid
        columns={COLUMNS}
        dataSource={users}
        loading={loading}
        actions={(user: User) => (
          <>
            <LinkItem onClick={handleChangeClick(user.id, router)}>
              Редактировать
            </LinkItem>
            <LinkItem onClick={handleDeleteClick(user, setCurUser)}>
              Удалить
            </LinkItem>
          </>
        )}
      />
      <Modal
        title="Удаление пользователя"
        open={!!curUser}
        hasFooter={true}
        confirmBtnName={'Выполнить'}
        cancelBtnName={'Отмена'}
        onConfirm={handleConfirm(curUser, router, dispatch, setCurUser)}
        onClose={handleClose(setCurUser)}
      >
        <div>Вы уверены, что хотите удалить пользователя №{curUser?.id}?</div>
      </Modal>
    </>
  );
};

UsersPage.PageLayout = AdminLayout;

const LinkItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: #e62323;
  cursor: pointer;
`;

export default UsersPage;
