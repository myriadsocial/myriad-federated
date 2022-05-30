import "@fontsource/mulish";
import * as React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import lightTheme from "../themes/theme";
import { ServerListComponent } from "../components/ServerList/ServerList.container";

const HomePage = () => {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ServerListComponent />
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
