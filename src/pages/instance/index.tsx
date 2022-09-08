import React from 'react';
import nookies from 'nookies';
import Head from 'next/head';

import {GetServerSidePropsContext} from 'next';
import {Container} from '@mui/material';

import {InstanceComponent} from 'src/components/Instance/InstanceComponent';

type InstanceProps = {
  accountId: string;
};

export const Instance: React.FC<InstanceProps> = ({accountId}) => {
  return (
    <React.Fragment>
      <Head>
        <title>My Instances</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="bg-background-content min-h-screen p-5">
        <Container>
          <InstanceComponent accountId={accountId} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const session = cookies?.session;

  try {
    const data = JSON.parse(session);

    if (!data?.currentAddress) throw 'AccountNotFound';
    return {
      props: {accountId: data.currentAddress},
    };
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Instance;
