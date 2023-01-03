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
import Select from '../ui-kit/Select';
import { FORM_SCHEMA, SECTIONS } from './constants';
import { onSubmit } from './helpers';
import { ManageCategoryFormItemName } from './types';

type Props = {
  category: any;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageCategoryForm = ({
  title,
  category,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = {
    title: category?.title,
    section: category?.section,
  };

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BreadCrumbs />
      {!isLoading ? (
        <Form
          initialValues={initialValues}
          formSchema={FORM_SCHEMA}
          onSubmit={onSubmit(category?.id, editMode, router, dispatch)}
        >
          <FormContent>
            <FormItem
              title="Название"
              name={ManageCategoryFormItemName.Title}
              component={Input}
              fullSize={true}
            />
            <FormItem
              title="Секция"
              name={ManageCategoryFormItemName.Section}
              component={Select}
              items={SECTIONS}
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

export default memo(ManageCategoryForm);
