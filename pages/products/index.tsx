import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLUMNS } from '../../components/products/constants';
import {
  handleChangeClick,
  handleClose,
  handleConfirm,
  handleCreateClick,
  handleDeleteClick,
} from '../../components/products/helpers';
import { PageTitle } from '../../components/common';
import AdminLayout from '../../components/layouts/admin';
import { handleSignout } from '../../components/layouts/admin/helpers';
import BreadCrumbs from '../../components/ui-kit/Breadcrumbs';
import Button from '../../components/ui-kit/Button';
import DataGrid from '../../components/ui-kit/DataGrid';
import Modal from '../../components/ui-kit/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearProducts,
  fetchProducts,
} from '../../redux/slicers/productSlicer';
import { TProductsState } from '../../redux/types';
import { Product } from '../../swagger/autogen';

const ProductsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curProduct, setCurProduct] = useState<Product | null>(null);
  const { products, loading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );

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

ProductsPage.PageLayout = AdminLayout;

const LinkItem = styled.a`
  display: inline-block;
  padding: 5px 10px;
  color: #e62323;
  cursor: pointer;
`;

export default ProductsPage;
