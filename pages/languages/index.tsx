import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../components/common';
import { COLUMNS } from '../../components/languages/constants';
import {
  handleChangeClick,
  handleClose,
  handleConfirm,
  handleCreateClick,
  handleDeleteClick,
  handleTranslationsClick,
} from '../../components/languages/helpers';
import AdminLayout from '../../components/layouts/admin';
import { handleSignout } from '../../components/layouts/admin/helpers';
import BreadCrumbs from '../../components/ui-kit/Breadcrumbs';
import Button from '../../components/ui-kit/Button';
import DataGrid from '../../components/ui-kit/DataGrid';
import Modal from '../../components/ui-kit/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCategories } from '../../redux/slicers/categorySlicer';
import { fetchLanguages } from '../../redux/slicers/languageSlicer';
import { TLanguageState } from '../../redux/types';
import { Language } from '../../swagger/autogen';

const LanguagesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curLanguage, setCurLanguage] = useState<Language | null>(null);
  const { languages, loading } = useAppSelector<TLanguageState>(
    (state) => state.languages,
  );

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const result = (await dispatch(fetchLanguages())) as any;

        if (result.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }
      })();

      return () => {
        dispatch(clearCategories());
      };
    });
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Opturko | Администрирование</title>
        <meta name="description" content="Opturko | Администрирование" />
      </Head>
      <PageTitle>
        Локализации
        <ActionsWrapper>
          <Button width={250} onClick={handleTranslationsClick(router)}>
            Переводы приложения
          </Button>
          <Button width={250} onClick={handleCreateClick(router)}>
            Создать локализацию
          </Button>
        </ActionsWrapper>
      </PageTitle>
      <BreadCrumbs />
      <DataGrid
        columns={COLUMNS}
        dataSource={languages}
        loading={loading}
        actions={(language: Language) => (
          <>
            <LinkItem onClick={handleChangeClick(language.id, router)}>
              Редактировать
            </LinkItem>
            <LinkItem onClick={handleDeleteClick(language, setCurLanguage)}>
              Удалить
            </LinkItem>
          </>
        )}
      />
      <Modal
        title="Удаление категории"
        open={!!curLanguage}
        hasFooter={true}
        confirmBtnName={'Выполнить'}
        cancelBtnName={'Отмена'}
        onConfirm={handleConfirm(curLanguage, router, dispatch, setCurLanguage)}
        onClose={handleClose(setCurLanguage)}
      >
        <div>Вы уверены, что хотите удалить язык №{curLanguage?.id}?</div>
      </Modal>
    </>
  );
};

LanguagesPage.PageLayout = AdminLayout;

const LinkItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: #e62323;
  cursor: pointer;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default LanguagesPage;
