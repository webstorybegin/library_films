export * from './colors';
export * from './typography';
export * from './spacing';

import { lightTheme, darkTheme } from './colors';

export const getTheme = (isDark: boolean) => {
  return isDark ? darkTheme : lightTheme;
};
