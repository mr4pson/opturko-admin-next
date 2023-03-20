import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { Language, Translation } from '../../../swagger/autogen';
import { PageTitle } from '../../common';
import BreadCrumbs from '../../ui-kit/Breadcrumbs';
import Button from '../../ui-kit/Button';
import Form from '../../ui-kit/Form';
import FormItem from '../../ui-kit/FormItem';
import Input from '../../ui-kit/Input';
import Loading from '../../ui-kit/Loading';
import { getTranslationFormSchema, onSubmit } from './helpers';
import { ManageTranslationFormItemName } from './types';

type Props = {
  translation: Translation | null;
  languages: Language[];
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
};

const ManageLanguageForm = ({
  title,
  translation,
  languages,
  isLoading,
  isSaveLoading,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const translations = Object.entries(translation ?? {}).reduce(
    (
      accum: { [key: string]: { [key: string]: string } },
      [key, translation],
    ) => {
      try {
        Object.entries(JSON.parse(translation.toString() ?? "''")).forEach(
          ([lang, value]: any) => {
            accum[`${lang}_${key}`] = value;
          },
        );
      } catch (error) {
        console.log(error);
      }

      return accum;
    },
    {},
  ) as unknown as { [key: string]: string };

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BreadCrumbs />
      {!isLoading ? (
        <Form
          initialValues={translations}
          // formSchema={getTranslationFormSchema(languages)}
          onSubmit={onSubmit(dispatch, router)}
        >
          <FormContent>
            {languages.map((language, index) => (
              <div key={`lang-${index}`}>
                <LanguageTitle>{language.title}</LanguageTitle>
                <FormItem
                  title="Заголовок 'авторизация'"
                  name={`${language.code}_${ManageTranslationFormItemName.Auth}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Поле 'логин'"
                  name={`${language.code}_${ManageTranslationFormItemName.Login}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Поле 'пароль'"
                  name={`${language.code}_${ManageTranslationFormItemName.Password}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Кнопка 'войти'"
                  name={`${language.code}_${ManageTranslationFormItemName.Signin}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Кнопка 'выйти'"
                  name={`${language.code}_${ManageTranslationFormItemName.Signout}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Кнопка 'отправить'"
                  name={`${language.code}_${ManageTranslationFormItemName.Send}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'количество упаковок'"
                  name={`${language.code}_${ManageTranslationFormItemName.Package}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'цена / количество шт.'"
                  name={`${language.code}_${ManageTranslationFormItemName.ProductNumber}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'код'"
                  name={`${language.code}_${ManageTranslationFormItemName.Code}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'в упаковке'"
                  name={`${language.code}_${ManageTranslationFormItemName.InPackage}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Кнопка 'в корзину'"
                  name={`${language.code}_${ManageTranslationFormItemName.AddToCart}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'женщинам'"
                  name={`${language.code}_${ManageTranslationFormItemName.Women}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'мужчинам'"
                  name={`${language.code}_${ManageTranslationFormItemName.Men}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'детям'"
                  name={`${language.code}_${ManageTranslationFormItemName.Children}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Кнопка 'категории'"
                  name={`${language.code}_${ManageTranslationFormItemName.Categories}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'В разделе нет продуктов'"
                  name={`${language.code}_${ManageTranslationFormItemName.NoProducts}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'неправильный email'"
                  name={`${language.code}_${ManageTranslationFormItemName.InvalidEmail}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'неверный пароль'"
                  name={`${language.code}_${ManageTranslationFormItemName.InvalidPassword}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'ошибка сервера'"
                  name={`${language.code}_${ManageTranslationFormItemName.ServerError}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Текст 'свяжитесь с администратором'"
                  name={`${language.code}_${ManageTranslationFormItemName.ContactAdministrator}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Элемент сортировки по цене 'Сначала дешевые'"
                  name={`${language.code}_${ManageTranslationFormItemName.CheapFirst}`}
                  component={Input}
                  fullSize={true}
                />
                <FormItem
                  title="Элемент сортировки по цене 'Сначала дорогие'"
                  name={`${language.code}_${ManageTranslationFormItemName.ExpensiveFirst}`}
                  component={Input}
                  fullSize={true}
                />
              </div>
            ))}
            <Button htmlType={'submit'} loading={isSaveLoading}>
              Сохранить
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

const LanguageTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default memo(ManageLanguageForm);
