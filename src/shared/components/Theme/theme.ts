import { createTheme, MantineColorsTuple } from '@mantine/core';

// Vibrant brand primary colors (Blue-Violet range)
const brandPrimary: MantineColorsTuple = [
  '#f0eafa',
  '#e0d2f6',
  '#c0a2f1',
  '#9b6eec',
  '#7a42e8',
  '#6325e6',
  '#5515e6',
  '#4608ce',
  '#3d04b8',
  '#3300a2',
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: brandPrimary,
  },
  fontFamily: 'var(--font-outfit), sans-serif',
  headings: {
    fontFamily: 'var(--font-outfit), sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 600,
      },
      styles: {
        root: {
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-body)',
        },
      },
    },
  },
});
