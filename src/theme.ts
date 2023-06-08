import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#f15b2b",
      light: "#ee5d37",
      dark: "#ea0606",
    },
    secondary: {
      main: "rgba(218,218,218,0.46)",
      dark: "#b9b9b9",
    },
    info: {
      main: "#1abaed",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

export default theme;
