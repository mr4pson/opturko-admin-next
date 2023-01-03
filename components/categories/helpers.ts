import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Section } from '../../common/enums';
import {
  createCategory,
  deleteCategory,
  editCategory,
} from '../../redux/slicers/categorySlicer';
import { AppDispatch } from '../../redux/store';
import { Category } from '../../swagger/autogen';
import { handleSignout } from '../layouts/admin/helpers';
import { SECTIONS } from './constants';

const handleChangeClick = (id: number, router: NextRouter) => () => {
  router.push(`/categories/${id}`);
};

const handleCreateClick = (router: NextRouter) => () => {
  router.push(`/categories/create`);
};

const handleDeleteClick =
  (
    category: Category,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
  ) =>
  () => {
    setCurCategory(category);
  };

const onSubmit =
  (id: number, editMode: boolean, router: NextRouter, dispatch: AppDispatch) =>
  async (values: any) => {
    if (editMode) {
      const result = (await dispatch(
        editCategory({ id, category: values }),
      )) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    } else {
      const result = (await dispatch(createCategory(values))) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    }

    router.push('/categories');
  };

const handleConfirm =
  (
    curCategory: Category | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
  ) =>
  async () => {
    const deleteRes = (await dispatch(deleteCategory(curCategory!.id))) as any;

    if (deleteRes.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }

    setCurCategory(null);
  };

const handleClose =
  (setCurCategory: Dispatch<SetStateAction<Category | null>>) => () => {
    setCurCategory(null);
  };

const formatSectionName = (section: Section) => {
  const curSection = SECTIONS.find(
    (sectionItem) => sectionItem.value === section,
  );

  return curSection?.label;
};

export {
  handleChangeClick,
  handleCreateClick,
  handleDeleteClick,
  handleConfirm,
  handleClose,
  onSubmit,
  formatSectionName,
};
