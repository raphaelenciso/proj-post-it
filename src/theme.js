import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { indigo, deepOrange } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
