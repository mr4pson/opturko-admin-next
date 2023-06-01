import React, { memo } from 'react';
import styled from 'styled-components';
import { DOTS, usePagination } from '../../../common/hooks/usePagination';

type TProps = {
  onPageChange: any;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: TProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <PaginationContainer>
      <PaginationItem disabled={currentPage === 1} onClick={onPrevious}>
        <Arrow left={true} disabled={currentPage === 1} />
      </PaginationItem>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <PaginationItem key={`pagination-item-${index}`} dots={true}>
              &#8230;
            </PaginationItem>
          );
        }

        return (
          <PaginationItem
            key={`pagination-item-${index}`}
            selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={currentPage === lastPage} onClick={onNext}>
        <Arrow right={true} disabled={currentPage === lastPage} />
      </PaginationItem>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  margin-top: 55px;
  padding-left: 0;
`;

const PaginationItem = styled.li<{
  disabled?: boolean;
  selected?: boolean;
  dots?: boolean;
}>`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 16px;
  min-width: 32px;
  color: #000;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 0, 0, 0.3);
    cursor: pointer;
  }

  ${({ dots }) => {
    if (!!dots) {
      return `
        &::hover {
          background-color: transparent;
          cursor: default;
        }
      `;
    }
  }};

  ${({ disabled }) => {
    if (!!disabled) {
      return `pointer-events: none;`;
    }
  }};

  ${({ selected }) => {
    if (!!selected) {
      return `
        color: #fff;
        background-color: red
      `;
    }
  }};
`;

const Arrow = styled.div<{
  left?: boolean;
  right?: boolean;
  disabled?: boolean;
}>`
  margin-top: -2px;

  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid #000;
    border-top: 0.12em solid #000;
  }

  ${({ left }) => {
    if (!!left) {
      return `
        margin-top: -5px;
        margin-left: -2px;
        transform: rotate(-135deg) translate(-50%);
      `;
    }
  }};

  ${({ right }) => {
    if (!!right) {
      return `transform: rotate(45deg);`;
    }
  }};

  ${({ disabled }) => {
    if (!!disabled) {
      return `
        &::before {
          border-right: 0.12em solid rgba(255, 255, 255, 0.43);
          border-top: 0.12em solid rgba(255, 255, 255, 0.43);
        }

        &:hover {
          background-color: transparent;
          cursor: default;
        }
      `;
    }
  }};
`;

export default memo(Pagination);
