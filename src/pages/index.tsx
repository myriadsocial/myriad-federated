import React from 'react';
import Head from 'next/head';

import nookies from 'nookies';

import {ServerListComponent} from 'src/components/ServerList/ServerList';
import {GetServerSidePropsContext} from 'next';

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);

  if (cookies?.currentAddress) {
    return {
      redirect: {
        destination: '/instance',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default HomeApp;
