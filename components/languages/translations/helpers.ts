import { NextRouter, Router } from 'next/router';
import * as Yup from 'yup';
import { updateTranslation } from '../../../redux/slicers/translationSlicer';
import { AppDispatch } from '../../../redux/store';
import { Language, Translation } from '../../../swagger/autogen';
import { handleSignout } from '../../layouts/admin/helpers';
import { ManageTranslationFormItemName } from './types';

const onSubmit =
  (dispatch: AppDispatch, router: NextRouter) =>
  async (rawFormValue: { [key: string]: string }) => {
    const formValue = Object.entries(rawFormValue).reduce(
      (accum: any, [key, value]) => {
        const [lang, translationKey] = key.split('_') as [string, string];

        if (!accum[lang]) {
          accum[lang] = {};
        }

        accum[lang][translationKey] = value;

        return accum;
      },
      {},
    ) as { [key: string]: { [key: string]: string } };

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
      }, {});

    console.log(payload);
    const result = (await dispatch(
      updateTranslation(payload as unknown as Translation),
    )) as any;

    router.push('/languages');

    if (result.error?.message === 'Unauthorized.') {
      handleSignout(dispatch, router);
    }
  };

const getTranslationFormSchema = (languages: Language[]) => {
  const schema = languages.reduce((accum, language) => {
    accum = {
      ...accum,
      [`[${language.code}]${ManageTranslationFormItemName.Auth}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Login}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Password}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Signin}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Signout}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Send}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Package}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.ProductNumber}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.Code}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.InPackage}`]:
        Yup.string().required('Поле обязательно'),
      [`[${language.code}]${ManageTranslationFormItemName.AddToCart}`]:
        Yup.string().required('Поле обязательно'),
    };

    return accum;
  }, {});

  return Yup.object().shape(schema);
};

export { onSubmit, getTranslationFormSchema };
