import { IUser } from '../common/interfaces/user.interface';
import {
  Category,
  Language,
  Product,
  Translation,
  User,
} from '../swagger/autogen';

type TAuthState = {
  user: IUser | null;
  loading: boolean;
};

type TCategoriesState = {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  saveLoading: boolean;
};

type TLanguageState = {
  languages: Language[];
  language: Language | null;
  loading: boolean;
  saveLoading: boolean;
};

type TTranslationState = {
  translation: Translation | null;
  loading: boolean;
  saveLoading: boolean;
};

type TProductsState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  saveLoading: boolean;
};

type TUsersState = {
  users: User[];
  user: User | null;
  loading: boolean;
  saveLoading: boolean;
};

export type {
  TAuthState,
  TCategoriesState,
  TProductsState,
  TUsersState,
  TLanguageState,
  TTranslationState,
};
