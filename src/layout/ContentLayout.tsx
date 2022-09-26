import React from 'react';

import Head from 'next/head';

import Header from '../components/organisms/Header';
import Siderbar from '../components/organisms/Siderbar';

export default function ContentLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <Head>
        <title>Myriad Dashboard</title>
        <meta name="description" content="Myriad Dashboard" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="flex w-full h-screen bg-background-content">
        <div className="w-[248px] h-auto bg-white">
          <Siderbar />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Header title={title} />
          <div className="h-[calc(100%-97px)] mx-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
