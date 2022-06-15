import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import themeV2 from "../src/themes/light-theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeV2}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
