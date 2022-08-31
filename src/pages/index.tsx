import React from 'react';
import Head from 'next/head';

import {ServerListComponent} from 'src/components/ServerList/ServerList';
import {PolkadotJs} from 'src/lib/services/polkadot-js';
import {GetServerSidePropsContext} from 'next';
import nookies from 'nookies';
import {ServerListProps} from 'src/interface/ServerListInterface';

type IndexProps = {
  servers: ServerListProps[];
  serverMetric: {
    totalUsers: number;
    totalPosts: number;
    totalInstances: number;
  };
};

const HomeApp: React.FC<IndexProps> = ({servers, serverMetric}) => {
  return (
    <div>
      <Head>
        <title>Myriad Federated</title>
        <meta name="description" content="Myriad Federated" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ServerListComponent servers={servers} metric={serverMetric} />
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

  let servers: ServerListProps[] = [];
  let totalUsers = 0;
  let totalPosts = 0;
  let totalInstances = 0;

  try {
    const polkadot = await PolkadotJs.connect();
    const result = await polkadot?.serverList();

    totalInstances = (await polkadot?.totalServer()) ?? 0;

    if (polkadot) await polkadot.disconnect();
    if (result) {
      servers = await Promise.all(
        result.map(async e => {
          let data = null;

          try {
            const response = await fetch(`${e.apiUrl}/server`);
            data = await response.json();
          } catch {
            // ignore
          }

          totalUsers += data?.metric?.totalUsers ?? 0;
          totalPosts += data?.metric?.totalPosts ?? 0;

          return {
            ...e,
            detail: data,
          };
        }),
      );
    }
  } catch {
    // ignore
  }

  return {
    props: {
      servers,
      serverMetric: {
        totalUsers,
        totalPosts,
        totalInstances,
      },
    },
  };
};

export default HomeApp;
