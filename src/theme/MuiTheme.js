import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34aee6",
      dark: "#1e94ca",
    },
    warning: {
      main: "#FFD88D",
    },
    error: {
      main: "#FF8B7B",
    },
    success: {
      main: "#88d36c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#CABDFF",
    },
    info: {
      main: "#B1E5FC",
    },
  },
  typography: { fontFamily: "Inter" },
  components: {
    MuiButton: {
      defaultProps: {
        color: "success",
        variant: "contained",
        size: "large",
      },
      styleOverrides: {
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          paddingTop: "14px",
          paddingBottom: "14px",
          color: "#151515",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 8,
          fontSize: "14px",
        },
        sizeMedium: {
          color: "#151515",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 8,
          fontSize: "14px",
        },
        sizeSmall: {
          color: "#1E2124",
          textTransform: "none",
          borderRadius: "8px",
          fontSize: "14px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          borderRadius: 8,
          color: "#1A1D1F",
          fontWeight: 600,
          fontSize: 14,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ">div": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "primary.main",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

function MuiThemeProvider(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default MuiThemeProvider;
