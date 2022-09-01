import React from 'react';
import nookies from 'nookies';
import Head from 'next/head';

import {GetServerSidePropsContext} from 'next';
import {Container} from '@mui/material';

import {InstanceComponent} from 'src/components/Instance/InstanceComponent';
import {PolkadotJs} from 'src/lib/services/polkadot-js';
import {ServerListProps} from 'src/interface/ServerListInterface';

type InstanceProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const Instance: React.FC<InstanceProps> = ({accountId, servers}) => {
  return (
    <React.Fragment>
      <Head>
        <title>My Instances</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="bg-background-content min-h-screen p-5">
        <Container>
          <InstanceComponent accountId={accountId} servers={servers} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);

  if (!cookies?.currentAddress) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let servers: ServerListProps[] = [];

  try {
    const polkadot = await PolkadotJs.connect();
    const result = await polkadot?.serverListByOwner(cookies.currentAddress);

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
      accountId: cookies.currentAddress,
      servers,
    },
  };
};

export default Instance;
