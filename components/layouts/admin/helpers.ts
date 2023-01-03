import { NextRouter } from 'next/router';
import { signout } from '../../../redux/slicers/authSlicer';
import { AppDispatch } from '../../../redux/store';
import { TNavItem } from './types';

export const handleSignout = (dispatch: AppDispatch, router: NextRouter) => {
  dispatch(signout());
  router.push('/login');
};

const getNavItems = (dispatch: AppDispatch, router: NextRouter): TNavItem[] => {
  return [
    {
      title: 'Категории',
      link: '/categories',
    },
    {
      title: 'Товары',
      link: '/products',
    },
    {
      title: 'Пользователи',
      link: '/users',
    },
    {
      title: 'Выйти',
      handler: () => {
        handleSignout(dispatch, router);
      },
    },
  ];
};

export { getNavItems };
