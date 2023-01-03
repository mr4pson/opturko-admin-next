export type THandler<T = boolean | number | string> =
  | ((value: T) => void)
  | undefined;

export type SwitchThemes = 'green' | 'blue';
