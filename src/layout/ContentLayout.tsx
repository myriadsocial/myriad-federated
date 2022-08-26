import Head from "next/head";
import React from "react";
import Header from "../components/organisms/Header";
import Siderbar from "../components/organisms/Siderbar";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-screen min-h-[600px] bg-background-content">
        <div className="w-[248px] h-full bg-white">
          <Siderbar />
        </div>
        <div className="flex-1 h-full">
          <Header title={title} />
          <div className="h-[calc(100%-97px)] mx-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
