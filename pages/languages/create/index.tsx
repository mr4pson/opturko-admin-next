import MangageLanguageForm from '../../../components/languages/MangageLanguageForm';
import AdminLayout from '../../../components/layouts/admin';
import { useAppSelector } from '../../../redux/hooks';
import { TLanguageState } from '../../../redux/types';

const CreateLanguage = () => {
  const title = 'Создание локализации';
  const { saveLoading } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  return (
    <MangageLanguageForm
      title={title}
      editMode={false}
      language={null}
      isLoading={false}
      isSaveLoading={saveLoading}
    />
  );
};

CreateLanguage.PageLayout = AdminLayout;

export default CreateLanguage;
