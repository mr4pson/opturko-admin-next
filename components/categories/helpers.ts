import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Section } from '../../common/enums';
import {
  createCategory,
  deleteCategory,
  editCategory,
  purgeCategory,
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

const handleDeleteCategoryClick =
  (
    category: Category,
    setIsDeleteCategoryOpen: Dispatch<Boolean>,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
  ) =>
  () => {
    setCurCategory(category);
    setIsDeleteCategoryOpen(true);
  };

const handlePurgeCategoryClick =
  (
    category: Category,
    setIsPurgeCategoryOpen: Dispatch<Boolean>,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
  ) =>
  () => {
    setCurCategory(category);
    setIsPurgeCategoryOpen(true);
  };

const onSubmit =
  (id: number, editMode: boolean, router: NextRouter, dispatch: AppDispatch) =>
  async (rawFormValue: any) => {
    const formValue = Object.entries(rawFormValue)
      .filter(([key]) => key.includes('_'))
      .reduce((accum: any, [key, value]) => {
        const [lang, translationKey] = key.split('_') as [string, string];

        if (!accum[lang]) {
          accum[lang] = {};
        }

        accum[lang][translationKey] = value;

        return accum;
      }, {}) as { [key: string]: { [key: string]: string } };

    const translations = Object.entries(formValue).reduce(
      (
        accum: { [key: string]: { [key: string]: string } },
        [lang, translation],
      ) => {
        Object.entries(translation).forEach(([key, value]) => {
          if (!accum[key]) {
            accum[key] = {};
          }

          accum[key][lang] = value;
        });

        return accum;
      },
      {},
    );
    const payload = Object.entries(translations)
      .map(([key, value]) => ({
        [key]: JSON.stringify(value),
      }))
      .reduce((accum, translation) => {
        return {
          ...accum,
          ...translation,
        };
      }, {}) as any;

    console.log(payload);

    if (editMode) {
      const result = (await dispatch(
        editCategory({
          id,
          category: { ...payload, section: rawFormValue.section },
        }),
      )) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    } else {
      const result = (await dispatch(
        createCategory({ ...payload, section: rawFormValue.section }),
      )) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    }

    router.push('/categories');
  };

const handleDeleteCategoryConfirm =
  (
    curCategory: Category | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
    setIsDeleteCategoryOpen: Dispatch<Boolean>,
  ) =>
  async () => {
    const deleteRes = (await dispatch(deleteCategory(curCategory!.id))) as any;

    if (deleteRes.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }

    setCurCategory(null);
    setIsDeleteCategoryOpen(false);
  };

const handlePurgeCategoryConfirm =
  (
    curCategory: Category | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurCategory: Dispatch<SetStateAction<Category | null>>,
    setIsDeleteCategoryOpen: Dispatch<Boolean>,
  ) =>
  async () => {
    const deleteRes = (await dispatch(purgeCategory(curCategory!.id))) as any;

    if (deleteRes.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }

    setCurCategory(null);
    setIsDeleteCategoryOpen(false);
  };

const handleDeleteCategoryClose =
  (setCurCategory: Dispatch<SetStateAction<Category | null>>, setIsDeleteCategoryOpen: Dispatch<Boolean>) => () => {
    setCurCategory(null);
    setIsDeleteCategoryOpen(false);
  };

const handlePurgeCategoryClose =
  (setCurCategory: Dispatch<SetStateAction<Category | null>>, setIsPurgeCategoryOpen: Dispatch<Boolean>) => () => {
    setCurCategory(null);
    setIsPurgeCategoryOpen(false);
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
  handleDeleteCategoryClick,
  handlePurgeCategoryClick,
  handleDeleteCategoryConfirm,
  handlePurgeCategoryConfirm,
  handleDeleteCategoryClose,
  handlePurgeCategoryClose,
  onSubmit,
  formatSectionName,
};
