import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import {
  createLanguage,
  deleteLanguage,
  editLanguage,
} from '../../redux/slicers/languageSlicer';
import { AppDispatch } from '../../redux/store';
import { Language } from '../../swagger/autogen';
import { handleSignout } from '../layouts/admin/helpers';

const handleChangeClick = (id: number, router: NextRouter) => () => {
  router.push(`/languages/${id}`);
};

const handleCreateClick = (router: NextRouter) => () => {
  router.push(`/languages/create`);
};

const handleTranslationsClick = (router: NextRouter) => () => {
  router.push(`/languages/translations`);
};

const handleDeleteClick =
  (
    language: Language,
    setCurLanguage: Dispatch<SetStateAction<Language | null>>,
  ) =>
  () => {
    setCurLanguage(language);
  };

const onSubmit =
  (id: number, editMode: boolean, router: NextRouter, dispatch: AppDispatch) =>
  async (values: any) => {
    if (editMode) {
      const result = (await dispatch(
        editLanguage({ id, language: values }),
      )) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    } else {
      const result = (await dispatch(createLanguage(values))) as any;

      if (result.error?.message === 'Unauthorized.') {
        handleSignout(dispatch, router);
      }
    }

    router.push('/languages');
  };

const handleConfirm =
  (
    curLanguage: Language | null,
    router: NextRouter,
    dispatch: AppDispatch,
    setCurLanguage: Dispatch<SetStateAction<Language | null>>,
  ) =>
  async () => {
    const deleteRes = (await dispatch(deleteLanguage(curLanguage!.id))) as any;

    if (deleteRes.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }

    setCurLanguage(null);
  };

const handleClose =
  (setCurLanguage: Dispatch<SetStateAction<Language | null>>) => () => {
    setCurLanguage(null);
  };

export {
  handleChangeClick,
  handleCreateClick,
  handleDeleteClick,
  handleTranslationsClick,
  handleConfirm,
  handleClose,
  onSubmit,
};
