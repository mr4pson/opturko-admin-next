import { useEffect } from 'react';
import MangageTranslationForm from '../../../components/languages/translations/MangageTranslationForm';
import AdminLayout from '../../../components/layouts/admin';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchLanguages } from '../../../redux/slicers/languageSlicer';
import { fetchTranslation } from '../../../redux/slicers/translationSlicer';
import { TLanguageState, TTranslationState } from '../../../redux/types';

const CreateLanguage = () => {
  const title = 'Переводы приложения';
  const dispatch = useAppDispatch();
  const { translation, saveLoading, loading } =
    useAppSelector<TTranslationState>((state) => state.translations);
  const { languages } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  useEffect(() => {
    dispatch(fetchTranslation());
    dispatch(fetchLanguages());
  }, []);

  return (
    <MangageTranslationForm
      title={title}
      translation={translation}
      languages={languages}
      isLoading={loading}
      isSaveLoading={saveLoading}
    />
  );
};

CreateLanguage.PageLayout = AdminLayout;

export default CreateLanguage;
