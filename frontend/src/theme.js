import { extendTheme } from '@chakra-ui/react';
import "@fontsource/urbanist"; // Import Urbanist font

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  fonts: {
    heading: "'Urbanist', sans-serif",
    body: "'Urbanist', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.700',
          },
        },
        secondary: {
          bg: 'gray.100',
          color: 'gray.800',
          _hover: {
            bg: 'gray.200',
          },
        },
        danger: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
          },
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.200',
            paddingY: '3',
            paddingX: '4',
            textTransform: 'none',
            letterSpacing: 'normal',
            fontWeight: 'semibold',
          },
          td: {
            borderColor: 'gray.100',
            paddingY: '3',
            paddingX: '4',
          },
        }
      }
    }
  },
});

export default theme;