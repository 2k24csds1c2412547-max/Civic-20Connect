import { DefaultTheme } from 'react-native-paper';

export const colors = {
  // Civic Blue Scale
  civicBlue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Civic Green Scale
  civicGreen: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Primary green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Civic Orange Scale
  civicOrange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Primary orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  // Semantic Colors
  primary: '#3b82f6',
  secondary: '#22c55e',
  accent: '#f97316',
  background: '#ffffff',
  surface: '#f8fafc',
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#22c55e',
  info: '#3b82f6',
  
  // Text Colors
  text: {
    primary: '#1e3a8a',
    secondary: '#64748b',
    disabled: '#94a3b8',
    white: '#ffffff',
  },
  
  // Border Colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#64748b',
  }
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.civicBlue[500],
    accent: colors.civicGreen[500],
    background: colors.background,
    surface: colors.surface,
    text: colors.text.primary,
    disabled: colors.text.disabled,
    placeholder: colors.text.secondary,
    backdrop: 'rgba(30, 58, 138, 0.5)',
    notification: colors.civicOrange[500],
  },
  roundness: 8,
};

export const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientBackground: {
    flex: 1,
    // Note: For gradients in React Native, you'll need react-native-linear-gradient
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
