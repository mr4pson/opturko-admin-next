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
import Input from '../../components/ui-kit/Input';
import Modal from '../../components/ui-kit/Modal';
import Select from '../../components/ui-kit/Select';
import { SelectItem } from '../../components/ui-kit/Select/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchCategories,
  fetchCategoriesBySection,
} from '../../redux/slicers/categorySlicer';
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
  const [section, setSection] = useState<string>();
  const [category, setCategory] = useState<SelectItem>();
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();
  const { products, loading } = useAppSelector<TProductsState>(
    (state) => state.products,
  );
  const { categories } = useAppSelector<TCategoriesState>(
    (state) => state.categories,
  );

  const categoryItems = categories.map((category) => {
    let title = {} as { [key: string]: string };
    let lang = 'ru';

    try {
      title = JSON.parse(category.title);

      if (Object.keys(title).length && !title.ru) {
        lang = Object.keys(title)[0];
      }
    } catch (error) {
      console.log(error);
    }

    const curSection = SECTIONS.find(
      (sectionItem) => sectionItem.value === category.section,
    );

    return {
      label: `${curSection?.label} -> ${title[lang]}`,
      value: category.id,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const caregoriesResult = (await dispatch(fetchCategories())) as any;

        if (caregoriesResult.error?.message === 'Unauthorized.') {
          handleSignout(dispatch, router);
        }

        const productsResult = (await dispatch(fetchProducts())) as any;

        if (productsResult.error?.message === 'Unauthorized.') {
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
      dispatch(
        fetchProductsByCategory({
          id: category.value as number,
          priceFrom,
          priceTo,
        }),
      );
    }
  }, [category, priceFrom, priceTo]);

  const handleSectionChange = () => (value: string) => {
    setSection(value);
  };

  const handleCategoryChange = () => (value: number) => {
    const curCategory = categoryItems.find(
      (category) => category.value === value,
    );
    setCategory(curCategory);
  };

  const handlePriceFromChange = () => (value: number | string) => {
    setPriceFrom(+value);
  };

  const handlePriceToChange = () => (value: number | string) => {
    setPriceTo(+value);
  };

  return (
    <>
      <Head>
        <title>Opturko | ??????????????????????????????????</title>
        <meta name="description" content="Opturko | ??????????????????????????????????" />
      </Head>
      <PageTitle>
        ????????????
        <Button width={250} onClick={handleCreateClick(router)}>
          ?????????????? ??????????
        </Button>
      </PageTitle>
      <BreadCrumbs />
      <FiltersWrapper>
        <Select
          items={SECTIONS}
          placeholder={'???????????????? ????????????'}
          style={{ width: '250px' }}
          onChange={handleSectionChange()}
        ></Select>
        <Select
          items={categoryItems}
          value={category}
          placeholder={'???????????????? ??????????????????'}
          style={{ width: '250px' }}
          onChange={handleCategoryChange()}
        ></Select>
        <Input
          width={200}
          value={priceFrom ?? 0}
          placeholder={'???????? ????'}
          onChange={handlePriceFromChange()}
        />
        <Input
          width={200}
          value={priceTo ?? 0}
          placeholder={'???????? ????'}
          onChange={handlePriceToChange()}
        />
      </FiltersWrapper>
      <DataGrid
        columns={COLUMNS}
        dataSource={products}
        loading={loading}
        actions={(product: Product) => (
          <>
            <LinkItem onClick={handleChangeClick(product.id, router)}>
              ??????????????????????????
            </LinkItem>
            <LinkItem onClick={handleDeleteClick(product, setCurProduct)}>
              ??????????????
            </LinkItem>
          </>
        )}
      />
      <Modal
        title="???????????????? ????????????"
        open={!!curProduct}
        hasFooter={true}
        confirmBtnName={'??????????????????'}
        cancelBtnName={'????????????'}
        onConfirm={handleConfirm(curProduct, router, dispatch, setCurProduct)}
        onClose={handleClose(setCurProduct)}
      >
        <div>???? ??????????????, ?????? ???????????? ?????????????? ?????????? ???{curProduct?.id}?</div>
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
