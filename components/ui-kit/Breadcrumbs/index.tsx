import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { ROUTES_MAP } from './constants';
import { getHref } from './helpers';

const BreadCrumbs = () => {
  const router = useRouter();
  const chunks = router.pathname.split('/');

  chunks.shift();

  return (
    <BreadCrumbsWrapper>
      {chunks.map((chunk: any, index) => {
        const isLastElement = index === chunks.length - 1;
        const href = getHref(chunk, isLastElement);

        return (
          <React.Fragment key={`breadcrumb-item-${index}`}>
            {!!href ? (
              <Link href={href}>{ROUTES_MAP[chunk]}</Link>
            ) : (
              <BreadCrumbsItem>{ROUTES_MAP[chunk]}</BreadCrumbsItem>
            )}
            {!isLastElement && '/'}
          </React.Fragment>
        );
      })}
    </BreadCrumbsWrapper>
  );
};

const BreadCrumbsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 20px;

  a {
    font-size: 14px;
    color: #9e9e9e;

    &[href] {
      color: #000;
    }
  }
`;

const BreadCrumbsItem = styled.a`
  font-size: 14px;
  color: #9e9e9e;

  &[href] {
    color: #000;
  }
`;

export default BreadCrumbs;
