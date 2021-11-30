import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from './style/Theme';
import {NavBar} from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline></CssBaseline>
    <NavBar/>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
