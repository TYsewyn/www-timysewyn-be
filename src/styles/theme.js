import {colors} from "@material-ui/core";

const defaultThemeOptions = {
  palette: {
    // Via https://material.io/resources/color
    primary: {
      light: '#73e8ff',
      main: '#29b6f6',
      dark: '#0086c3',
      contrastText: '#000000',
    },
    secondary: {
      light: '#55dd83',
      main: '#00aa55',
      dark: '#007929',
      contrastText: '#000000',
    },
    background: {
      default: colors.grey[200],
    },
    type: 'light'
  },
}

export default function themeOptions(appearance) {
  return {
    ...defaultThemeOptions,
    palette: {
      ...defaultThemeOptions.palette,
      type: appearance,
      background: {
        ...defaultThemeOptions.palette.background,
        default: (appearance === 'dark' ? '#303030' : colors.grey[200])
      },
    }
  };
}
