export const colors = {
  netflix: {
    black: '#141414',
    darkGray: '#181818',
    mediumGray: '#2F2F2F',
    lightGray: '#808080',
    red: '#E50914',
    white: '#FFFFFF',
    offWhite: '#D2D2D2',
  },
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  accent: '#E50914',
  navDark: '#141414',
};

// Theme using CSS custom properties — automatically responds to light/dark toggle
export const netflixTheme = {
  background: {
    main: 'var(--bg-main)',
    secondary: 'var(--bg-secondary)',
    card: 'var(--bg-card)',
    overlay: 'var(--bg-overlay)',
  },
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    disabled: 'var(--text-disabled)',
  },
  border: {
    light: 'var(--border-light)',
    main: 'var(--border-main)',
  },
  accent: 'var(--accent)',
  navigation: {
    background: 'var(--nav-bg)',
    text: 'var(--text-primary)',
    textActive: 'var(--text-primary)',
    border: 'transparent',
  },
};

// Legacy exports kept for compatibility
export const lightTheme = netflixTheme;
export const darkTheme = netflixTheme;

export type Theme = typeof netflixTheme;
