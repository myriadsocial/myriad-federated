import Head from "next/head";
import React from "react";

import { ServerListComponent } from "src/components/ServerList/ServerList";

const HomeApp: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Myriad Federated</title>
        <meta name="description" content="Myriad Federated" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ServerListComponent />
    </div>
  );
};

export default HomeApp;
