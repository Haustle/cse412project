import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "#FFFF",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#161616",
          width: "auto",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#3A3A3A",
          marginBottom: "15px",
          marginTop: "15px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "7.5px",
          "&:hover": {
            backgroundColor: "#292929",
          },
          "&.Mui-selected": {
            backgroundColor: "#4A4374",
            "&:hover": {
              backgroundColor: "#4A4374",
            },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: "#161616",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          background: "#161616",
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        height: "100px",
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      secondary: {
        color: "#a7a7a7",
      },
    },
  },
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
    background: {
      default: "#1A1A1A",
    },
    asphalt: {
      main: "#1A1A1A",
    },
    asphalt_lite: {
      main: "#292929",
    },
    divider_color: {
      main: "#3A3A3A",
    },
    accent_font: {
      main: "#A7A7A7",
    },
    purple_main: {
      main: "#9381FF",
    },
    purple_accent: {
      main: "#4A4374",
    },
  },
});

export default darkTheme ;
