import React from 'react';

export type TRender<T> = (item: T) => React.ReactNode;

export type TDataGridCol<T> = {
  field: string;
  title: string;
  render?: TRender<T>;
};
