import { typography } from "./typography";
import { colors } from "./colors";

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
