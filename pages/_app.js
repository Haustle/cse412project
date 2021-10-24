import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from './style/Theme';

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline></CssBaseline>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
