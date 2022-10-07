import { typography } from "./typography";
import { colors, greys } from "./colors";

export const theme = {
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  typography: {
    fontFamily: typography,
  },

  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: greys.light,
          },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: 1100,
          },
        },
      },
    },
  },
};
