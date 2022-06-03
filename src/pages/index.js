import "@fontsource/mulish";
import * as React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import lightTheme from "../themes/theme";
import { ServerListComponent } from "../components/ServerList/ServerList.container";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Myriad Federated</title>
      </Helmet>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ServerListComponent />
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
