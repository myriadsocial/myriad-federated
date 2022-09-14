import React from 'react';

import {GetServerSidePropsContext} from 'next';
import Head from 'next/head';

import {Container} from '@mui/material';

import {InstanceComponent} from 'src/components/Instance/InstanceComponent';

import cookie from 'cookie';

type InstanceProps = {
  accountId: string;
};

export const Instance: React.FC<InstanceProps> = ({accountId}) => {
  console.log('accountId', accountId);
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
  const cookies = cookie.parse(context?.req?.headers?.cookie ?? '');
  const server = cookies?.session;

  try {
    const data = JSON.parse(server);

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
