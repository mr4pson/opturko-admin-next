import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import {
  createUser,
  deleteUser,
  editUser,
} from '../../redux/slicers/userSlicer';
import { AppDispatch } from '../../redux/store';
import { User } from '../../swagger/autogen';
import { handleSignout } from '../layouts/admin/helpers';

const handleChangeClick = (id: number, router: NextRouter) => () => {
  router.push(`/users/${id}`);
};

const handleCreateClick = (router: NextRouter) => () => {
  router.push(`/users/create`);
};

const handleDeleteClick =
  (user: User, setCurUser: Dispatch<SetStateAction<User | null>>) => () => {
    setCurUser(user);
  };

const onSubmit =
  (id: number, editMode: boolean, router: NextRouter, dispatch: AppDispatch) =>
  async (values: any) => {
    if (editMode) {
      const result = (await dispatch(editUser({ id, user: values }))) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    } else {
      const result = (await dispatch(
        createUser({
          email: values.login,
          password: values.passwordhash,
        }),
      )) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    }

    router.push('/users');
  };

const handleConfirm =
  (
    curUser: User | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurUser: Dispatch<SetStateAction<User | null>>,
  ) =>
  async () => {
    const deleteRes = (await dispatch(deleteUser(curUser!.id))) as any;

    if (deleteRes.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }

    setCurUser(null);
  };

const handleClose =
  (setCurUser: Dispatch<SetStateAction<User | null>>) => () => {
    setCurUser(null);
  };

export {
  handleChangeClick,
  handleCreateClick,
  handleDeleteClick,
  handleConfirm,
  handleClose,
  onSubmit,
};
