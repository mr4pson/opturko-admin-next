import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ManageLanguageForm from '../../components/languages/MangageLanguageForm';
import AdminLayout from '../../components/layouts/admin';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearLanguage,
  fetchLanguage,
} from '../../redux/slicers/languageSlicer';
import { TLanguageState } from '../../redux/types';

const EditLanguage = () => {
  const title = 'Редактирование локализации';
  const router = useRouter();
  const { language, loading, saveLoading } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        await dispatch(fetchLanguage(router.query.id as any));
      }
    })();

    return () => {
      dispatch(clearLanguage());
    };
  }, [dispatch, router.query]);

  return (
    <ManageLanguageForm
      title={title}
      editMode={true}
      language={language}
      isLoading={loading}
      isSaveLoading={saveLoading}
    />
  );
};

EditLanguage.PageLayout = AdminLayout;

export default EditLanguage;
