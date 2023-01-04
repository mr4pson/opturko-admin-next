import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SECTIONS } from '../../components/categories/constants';
import { PageTitle } from '../../components/common';
import AdminLayout from '../../components/layouts/admin';
import { handleSignout } from '../../components/layouts/admin/helpers';
import { COLUMNS } from '../../components/products/constants';
import {
  handleChangeClick,
  handleClose,
  handleConfirm,
  handleCreateClick,
  handleDeleteClick,
} from '../../components/products/helpers';
import BreadCrumbs from '../../components/ui-kit/Breadcrumbs';
import Button from '../../components/ui-kit/Button';
import DataGrid from '../../components/ui-kit/DataGrid';
import Modal from '../../components/ui-kit/Modal';
import Select from '../../components/ui-kit/Select';
import { SelectItem } from '../../components/ui-kit/Select/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCategoriesBySection } from '../../redux/slicers/categorySlicer';
import {
  clearProducts,
  fetchProducts,
  fetchProductsByCategory,
} from '../../redux/slicers/productSlicer';
import { TCategoriesState, TProductsState } from '../../redux/types';
import { Product } from '../../swagger/autogen';

const ProductsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curProduct, setCurProduct] = useState<Product | null>(null);
  const { products, loading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );
  const { categories } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );
  const categoryItems = categories.map((category) => ({
    label: category.title,
    value: category.id,
  }));
  const [section, setSection] = useState<string>();
  const [category, setCategory] = useState<SelectItem>();

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const result = (await dispatch(fetchProducts())) as any;

        if (result.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }
      })();

      return () => {
        dispatch(clearProducts());
      };
    });
  }, [dispatch]);

  useEffect(() => {
    if (section) {
      dispatch(fetchCategoriesBySection(section));
    }
  }, [section]);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category.value as number));
    }
  }, [category]);

  const handleSectionChange = () => (value: string) => {
    setSection(value);
  };

  const handleCategoryChange = () => (value: number) => {
    const curCategory = categoryItems.find(
      (category) => category.value === value,
    );
    setCategory(curCategory);
  };

  return (
    <>
      <Head>
        <title>Opturko | Администрирование</title>
        <meta name="description" content="Opturko | Администрирование" />
      </Head>
      <PageTitle>
        Товары
        <Button width={250} onClick={handleCreateClick(router)}>
          Создать товар
        </Button>
      </PageTitle>
      <BreadCrumbs />
      <FiltersWrapper>
        <Select
          items={SECTIONS}
          placeholder={'Выберите секцию'}
          style={{ width: '250px' }}
          onChange={handleSectionChange()}
        ></Select>
        <Select
          items={categoryItems}
          value={category}
          placeholder={'Выберите категорию'}
          style={{ width: '250px' }}
          onChange={handleCategoryChange()}
        ></Select>
      </FiltersWrapper>
      <DataGrid
        columns={COLUMNS}
        dataSource={products}
        loading={loading}
        actions={(product: Product) => (
          <>
            <LinkItem onClick={handleChangeClick(product.id, router)}>
              Редактировать
            </LinkItem>
            <LinkItem onClick={handleDeleteClick(product, setCurProduct)}>
              Удалить
            </LinkItem>
          </>
        )}
      />
      <Modal
        title="Удаление товара"
        open={!!curProduct}
        hasFooter={true}
        confirmBtnName={'Выполнить'}
        cancelBtnName={'Отмена'}
        onConfirm={handleConfirm(curProduct, router, dispatch, setCurProduct)}
        onClose={handleClose(setCurProduct)}
      >
        <div>Вы уверены, что хотите удалить товар №{curProduct?.id}?</div>
      </Modal>
    </>
  );
};

const LinkItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: #e62323;
  cursor: pointer;
`;

const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;

ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
