import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { FlexContainer, PageTitle } from '../common';
import Button from '../ui-kit/Button';
import Form from '../ui-kit/Form';
import FormItem from '../ui-kit/FormItem';
import Input from '../ui-kit/Input';
import { FORM_SCHEMA } from './constants';
import { onSubmit } from './helpers';
import { LoginFormItemName } from './types';

type Props = {
  loading: boolean;
};
const LoginForm: React.FC<Props> = ({ loading }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <FlexContainer>
      <LoginWrapper>
        <PageTitle style={{ justifyContent: 'center' }}>Авторизация</PageTitle>
        <Form
          initialValues={{}}
          formSchema={FORM_SCHEMA}
          onSubmit={onSubmit(router, dispatch)}
        >
          <FormContent>
            <FormItem
              title="Email"
              type={'email'}
              name={LoginFormItemName.Login}
              component={Input}
              fullSize={true}
            />
            <FormItem
              title="Пароль"
              name={LoginFormItemName.Password}
              type={'password'}
              component={Input}
              fullSize={true}
            />
            <Button htmlType={'submit'} loading={loading}>
              Войти
            </Button>
          </FormContent>
        </Form>
      </LoginWrapper>
    </FlexContainer>
  );
};

const LoginWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 200px auto;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default memo(LoginForm);
