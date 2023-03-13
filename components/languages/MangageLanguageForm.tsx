import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { PageTitle } from '../common';
import BreadCrumbs from '../ui-kit/Breadcrumbs';
import Button from '../ui-kit/Button';
import Form from '../ui-kit/Form';
import FormItem from '../ui-kit/FormItem';
import Input from '../ui-kit/Input';
import Loading from '../ui-kit/Loading';
import { FORM_SCHEMA } from './constants';
import { onSubmit } from './helpers';
import { ManageLanguageFormItemName } from './types';

type Props = {
  language: any;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageLanguageForm = ({
  title,
  language,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = {
    title: language?.title,
    code: language?.code,
  };

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BreadCrumbs />
      {!isLoading ? (
        <Form
          initialValues={initialValues}
          formSchema={FORM_SCHEMA}
          onSubmit={onSubmit(language?.id, editMode, router, dispatch)}
        >
          <FormContent>
            <FormItem
              title="Название"
              name={ManageLanguageFormItemName.Title}
              component={Input}
              fullSize={true}
            />
            <FormItem
              title="Код"
              name={ManageLanguageFormItemName.Code}
              component={Input}
              fullSize={true}
            />
            <Button htmlType={'submit'} loading={isSaveLoading}>
              {editMode ? 'Сохранить' : 'Создать'}
            </Button>
          </FormContent>
        </Form>
      ) : (
        <Loading />
      )}
    </>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default memo(ManageLanguageForm);
