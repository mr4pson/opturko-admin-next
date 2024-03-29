import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLUMNS } from '../../components/categories/constants';
import {
  handleDeleteCategoryClose,
  handleDeleteCategoryConfirm,
  handleCreateClick,
  handleDeleteCategoryClick,
  handleChangeClick,
  handlePurgeCategoryClick,
  handlePurgeCategoryClose,
  handlePurgeCategoryConfirm,
} from '../../components/categories/helpers';
import { PageTitle } from '../../components/common';
import AdminLayout from '../../components/layouts/admin';
import { handleSignout } from '../../components/layouts/admin/helpers';
import BreadCrumbs from '../../components/ui-kit/Breadcrumbs';
import Button from '../../components/ui-kit/Button';
import DataGrid from '../../components/ui-kit/DataGrid';
import Modal from '../../components/ui-kit/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearCategories,
  fetchCategories,
} from '../../redux/slicers/categorySlicer';
import { TCategoriesState } from '../../redux/types';
import { Category } from '../../swagger/autogen';

const CategoriesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curCategory, setCurCategory] = useState<Category | null>(null);
  const [isPurgeCategoryOpen, setIsPurgeCategoryOpen] = useState<Boolean>(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState<Boolean>(false);
  const { categories, loading } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const result = (await dispatch(fetchCategories())) as any;

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
        Категории
        <Button width={250} onClick={handleCreateClick(router)}>
          Создать категорию
        </Button>
      </PageTitle>
      <BreadCrumbs />
      <DataGrid
        columns={COLUMNS}
        dataSource={categories}
        loading={loading}
        actions={(category: Category) => (
          <>
            <LinkItem onClick={handleChangeClick(category.id, router)}>
              Редактировать
            </LinkItem>
            <LinkItem onClick={handleDeleteCategoryClick(category, setIsDeleteCategoryOpen, setCurCategory)}>
              Удалить
            </LinkItem>
            <LinkItem onClick={handlePurgeCategoryClick(category, setIsPurgeCategoryOpen, setCurCategory)}>
              Отчистить
            </LinkItem>
          </>
        )}
      />
      <Modal
        title="Удаление категории"
        open={!!curCategory}
        hasFooter={true}
        confirmBtnName={'Выполнить'}
        cancelBtnName={'Отмена'}
        onConfirm={handleDeleteCategoryConfirm(curCategory, router, dispatch, setCurCategory, setIsDeleteCategoryOpen)}
        onClose={handleDeleteCategoryClose(setCurCategory, setIsDeleteCategoryOpen)}
      >
        <div>Вы уверены, что хотите удалить категорию №{curCategory?.id}?</div>
      </Modal>
      <Modal
        title="Удаление товаров в категории"
        open={!!curCategory}
        hasFooter={true}
        confirmBtnName={'Удалить'}
        cancelBtnName={'Отмена'}
        onConfirm={handlePurgeCategoryConfirm(curCategory, router, dispatch, setCurCategory, setIsPurgeCategoryOpen)}
        onClose={handlePurgeCategoryClose(setCurCategory, setIsPurgeCategoryOpen)}
      >
        <div>Вы уверены, что хотите удалить товары в категории №{curCategory?.id}?</div>
      </Modal>
    </>
  );
};

CategoriesPage.PageLayout = AdminLayout;

const LinkItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: #e62323;
  cursor: pointer;
`;

export default CategoriesPage;
