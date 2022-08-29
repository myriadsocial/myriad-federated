import getConfig from "next/config";
import React, { useEffect, useState } from "react";
import { ServerListProps } from "src/lib/services/polkadot-js";
import { numberFormatter } from "src/utils/numberFormatter";
import Button from "../atoms/Button";
import CardInstance from "../atoms/CardInstance";
import EmptyState from "../atoms/EmptyState";
const { publicRuntimeConfig } = getConfig();

import {
  Container,
  SvgIcon,
} from "@material-ui/core";

import { ServerIcon } from "@heroicons/react/outline";

import dynamic from 'next/dynamic';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { SearchBoxContainer } from "src/components/Search/SearchBoxContainer";
import { useGetList } from "src/hooks/server-list.hooks";
import Image from "next/image";
import { Illustration, MyriadFullBlack } from "public/icons";
import { useRouter } from "next/router";
import { usePolkadotExtension } from "src/hooks/use-polkadot-app.hooks";
import localforage from "localforage";

const PolkadotAccountList = dynamic(
  () => import('src/components/PolkadotAccountList/PolkadotAccountList'),
  {
    ssr: false,
  },
);
const CURRENT_ADDRESS = 'currentAddress';

export const ServerListComponent = () => {
  const router = useRouter();

  const { enablePolkadotExtension, getPolkadotAccounts } = usePolkadotExtension();
  const { servers, totalInstances, totalUsers, totalPosts } = useGetList();

  const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = React.useState(false);
  const [showAccountList, setShowAccountList] = React.useState<boolean>(false);
  const [serverList, setServerList] = useState<ServerListProps[]>([]);

  console.log(serverList);

  useEffect(() => {
    setServerList(servers);
  }, [servers]);

  useEffect(() => {
    localforage.getItem(CURRENT_ADDRESS, (err, value) => {
      if (err || !value) return;
      router.push('/instance');
    });
  }, [])

  const handleSearch = (query: string) => {
    const regex = new RegExp(`^${query.toLowerCase()}`, "i");

    const result = servers.filter((server) =>
      server.name.toLowerCase().match(regex)
    );

    if (!query) setServerList(servers);
    else setServerList(result);
  };

  const handleVisitWeb = () => {
    window.open(
      publicRuntimeConfig.myriadWebsiteURL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleContactUs = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.location.href = `mailto:${publicRuntimeConfig.myriadSupportMail}`;
    e.preventDefault();
  };

  const checkExtensionInstalled = async () => {
    const installed = await enablePolkadotExtension();

    setShowAccountList(true);
    setExtensionInstalled(installed);

    getAvailableAccounts();
  };

  const closeAccountList = () => {
    setShowAccountList(false);
  };

  const getAvailableAccounts = async () => {
    const accounts = await getPolkadotAccounts().catch(() => []);

    setAccounts(accounts);
  };

  const handleSelectedSubstrateAccount = (account: InjectedAccountWithMeta) => {
    closeAccountList();

    localforage.setItem(CURRENT_ADDRESS, account.address, (err) => {
      if (err) return;
      router.push('/instance');
    });
  }

  const handleSignIn = () => {
    checkExtensionInstalled();
  }

  return (
    <div className="bg-background-content min-h-screen">
      <Container maxWidth="lg" disableGutters>
        <div className="flex flex-col pt-5 gap-5">
          <div className="mb-[60px] flex justify-between">
            <Image alt="" src={MyriadFullBlack} objectFit="contain" />
            <div className="flex">
              <Button
                label="Visit website"
                type="text"
                onClick={handleVisitWeb}
              />
              <div className="mx-2">
                <Button
                  label="Contact us"
                  type="text"
                  onClick={(e: any) => handleContactUs(e)}
                />
              </div>
              <Button
                primary
                onClick={handleSignIn}
                label="Create Instance"
              />
            </div>
          </div>
          <header className="relative mb-[85px]">
            <div className="absolute z-10 right-0 -top-24">
              <Image alt="" src={Illustration} objectFit="contain" />
            </div>
            <div className="max-w-[422px]">
              <div className="text-[28px] mb-[14px] font-semibold">
                Join the Myriad Federated Instance now!
              </div>
              <div className="content-start items-center mb-3 flex text-[14px]">
                In Myriad Federated Instance, you can create your own instance
                or join as a member of an instance.
              </div>
            </div>
          </header>
          <div className="grid grid-cols-3 gap-5 z-20">
            <div className="bg-primary rounded-[10px] p-[40px]">
              <div className="flex">
                <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                  <SvgIcon component={ServerIcon} style={{ color: "white" }} />
                </div>
                <div className="ml-4">
                  <div className="text-[16px] text-white">Total instances</div>
                  <div className="text-[28px] text-white font-semibold">
                    {totalInstances.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-[10px] p-[40px]">
              <div className="flex">
                <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                  <SvgIcon component={ServerIcon} style={{ color: "white" }} />
                </div>
                <div className="ml-4">
                  <div className="text-[16px] text-white">Total users</div>
                  <div className="text-[28px] text-white font-semibold">
                    {totalUsers.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-[10px] p-[40px]">
              <div className="flex">
                <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                  <SvgIcon component={ServerIcon} style={{ color: "white" }} />
                </div>
                <div className="ml-4">
                  <div className="text-[16px] text-white">Total posts</div>
                  <div className="text-[28px] text-white font-semibold">
                    {totalPosts.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SearchBoxContainer onSubmitSearch={handleSearch} hidden={true} />
          </div>
          <div className="flex flex-col gap-2">
            {serverList.map((server, i) => (
              <CardInstance
                key={i}
                serverName={server.name}
                serverDetail={
                  server.detail && server.detail.categories.join(" ")
                }
                serverDescription={server.detail && server.detail.description}
                image={server.detail?.images.logo_banner!}
                type="landingPage"
                experiance={numberFormatter(
                  server.detail?.metric.totalExperiences!
                )}
                post={numberFormatter(server.detail?.metric.totalPosts!)}
                users={numberFormatter(server.detail?.metric.totalUsers!)}
              />
            ))}
            {!serverList.length && (
              <div className="h-[235px] w-full">
                <EmptyState
                  title={"No results"}
                  desc={"Please make sure your keywords match."}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
      <PolkadotAccountList
        align="left"
        title="Select account"
        isOpen={showAccountList && extensionInstalled}
        accounts={accounts}
        onSelect={handleSelectedSubstrateAccount}
        onClose={closeAccountList}
      />
    </div>
  );
};
