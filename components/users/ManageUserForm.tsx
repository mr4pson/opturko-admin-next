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
import { ManageUserFormItemName } from './types';

type Props = {
  user: any;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageUserForm = ({
  title,
  user,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = {
    login: user?.login,
  };

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BreadCrumbs />
      {!isLoading ? (
        <Form
          initialValues={initialValues}
          formSchema={FORM_SCHEMA}
          onSubmit={onSubmit(user?.id, editMode, router, dispatch)}
        >
          <FormContent>
            <FormItem
              title="Email"
              name={ManageUserFormItemName.Email}
              component={Input}
              fullSize={true}
            />
            <FormItem
              title="Пароль"
              name={ManageUserFormItemName.Password}
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

export default memo(ManageUserForm);
