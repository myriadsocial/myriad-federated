import {ServerIcon} from '@heroicons/react/outline';

import React, {useMemo, useState} from 'react';
import CountUp from 'react-countup';

import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {Container, SvgIcon} from '@material-ui/core';

import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types';

import {SearchBoxContainer} from 'src/components/Search/SearchBoxContainer';
import {InstanceType, useInstances} from 'src/hooks/use-instances.hook';
import {usePolkadotExtension} from 'src/hooks/use-polkadot-app.hook';
import {ServerListProps} from 'src/interface/ServerListInterface';
import {numberFormatter} from 'src/utils/numberFormatter';

import {destroyCookie, setCookie} from 'nookies';
import {IcAccountPolkadot, Illustration, MyriadFullBlack} from 'public/icons';

import Button from '../atoms/Button';
import CardInstance from '../atoms/CardInstance';
import EmptyState from '../atoms/EmptyState';
import ShowIf from '../common/show-if.component';
import SwitchAccount from '../molecules/SwitchAccount';
import {ShimerComponent} from './Shimer';

const PolkadotAccountList = dynamic(
  () => import('src/components/PolkadotAccountList/PolkadotAccountList'),
  {
    ssr: false,
  },
);

const {publicRuntimeConfig} = getConfig();

type ServerListComponentProps = {
  signIn: boolean;
};

export const ServerListComponent: React.FC<ServerListComponentProps> = ({signIn}) => {
  const router = useRouter();

  const {servers, metric, loading} = useInstances(InstanceType.ALL);
  const {enablePolkadotExtension, getPolkadotAccounts} = usePolkadotExtension();

  const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = React.useState(false);
  const [showAccountList, setShowAccountList] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string | null>(null);

  const search = (query: string | null) => {
    if (!query) return servers;
    const regex = new RegExp(`${query.toLowerCase()}`, 'gi');

    return servers.filter(server => {
      if (!server?.detail) return false;
      return server.detail.name.toLowerCase().match(regex);
    });
  };

  const serverList: ServerListProps[] = useMemo(() => search(query), [query, loading, search]);

  const handleSearch = (q?: string) => {
    if (!q) setQuery(null);
    else setQuery(q);
  };

  const handleVisitWeb = () => {
    window.open(publicRuntimeConfig.myriadWebsiteURL, '_blank', 'noopener,noreferrer');
  };

  const handleContactUs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  const handleSelectedSubstrateAccount = async (account: InjectedAccountWithMeta) => {
    closeAccountList();
    setCookie(null, 'session', JSON.stringify({currentAddress: account.address}));
    router.push('/instance');
  };

  const handleSignIn = () => {
    if (signIn) return router.push('/instance');
    checkExtensionInstalled();
  };

  const goToMyriadApp = (webUrl: string) => () => window.open(webUrl);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO: Handle logout
  const _handleLogout = () => {
    destroyCookie(null, 'session');
    router.push('/');
  };

  const handleSwitchAccount = () => {
    router.push('/');
  };
  const handleShowSwitchAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className="bg-background-content min-h-screen pb-4">
        <Container maxWidth="lg" disableGutters>
          <div className="flex flex-col pt-5 gap-5">
            <div className="mb-[60px] flex justify-between">
              <Image alt="" src={MyriadFullBlack} objectFit="contain" />
              <div className="flex">
                <Button label="Visit website" type="text" onClick={handleVisitWeb} />
                <div className="mx-2">
                  <Button label="Contact us" type="text" onClick={(e: any) => handleContactUs(e)} />
                </div>
                <Button
                  primary
                  onClick={signIn ? handleShowSwitchAccount : handleSignIn}
                  label={
                    signIn ? (
                      <div className="flex">
                        <Image src={IcAccountPolkadot} alt="" height={20} width={20} />
                        <div className="ml-2">My Instance</div>
                      </div>
                    ) : (
                      'Create Instance'
                    )
                  }
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
                <div className="content-start items-center mb-3 flex text-sm">
                  In Myriad Federated Instance, you can create your own instance or join as a member
                  of an instance.
                </div>
              </div>
            </header>
            <div className="grid grid-cols-3 gap-5 z-20">
              <div className="bg-primary rounded-[10px] p-[40px]">
                <div className="flex">
                  <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                    <SvgIcon component={ServerIcon} style={{color: 'white'}} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base text-white">Total instances</div>
                    <div className="text-[28px] text-white font-semibold">
                      <CountUp start={0} end={metric.totalInstances} separator="," />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-[10px] p-[40px]">
                <div className="flex">
                  <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                    <SvgIcon component={ServerIcon} style={{color: 'white'}} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base text-white">Total users</div>
                    <div className="text-[28px] text-white font-semibold">
                      <CountUp start={0} end={metric.totalUsers} separator="," />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-[10px] p-[40px]">
                <div className="flex">
                  <div className="h-[44px] w-[44px] bg-darkPrimary items-center justify-center flex rounded-lg">
                    <SvgIcon component={ServerIcon} style={{color: 'white'}} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base text-white">Total posts</div>
                    <div className="text-[28px] text-white font-semibold">
                      <CountUp start={0} end={metric.totalPosts} separator="," />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SearchBoxContainer onSubmitSearch={handleSearch} hidden={true} />
            </div>
            <div className="flex flex-col gap-2">
              <ShowIf condition={loading}>
                <ShimerComponent />
              </ShowIf>
              <ShowIf condition={!loading}>
                <ShowIf condition={serverList.length === 0}>
                  <div className="h-[235px] w-full">
                    <EmptyState
                      title={'No results'}
                      desc={'Please make sure your keywords match.'}
                    />
                  </div>
                </ShowIf>
                <ShowIf condition={serverList.length > 0}>
                  {serverList.map(server => {
                    if (!server?.detail) return <React.Fragment key={server.id} />;
                    return (
                      <CardInstance
                        key={server.id}
                        serverName={server.detail.name}
                        serverDetail={server.detail.categories.join(', ')}
                        serverDescription={server.detail.description}
                        image={server.detail.serverImageURL}
                        type="landingPage"
                        experience={numberFormatter(server.detail.metric.totalExperiences)}
                        post={numberFormatter(server.detail.metric.totalPosts)}
                        users={numberFormatter(server.detail.metric.totalUsers)}
                        onClick={goToMyriadApp('https://app.testnet.myriad.social')} // TODO: change to dynamic url
                      />
                    );
                  })}
                </ShowIf>
              </ShowIf>
            </div>
          </div>
        </Container>
      </div>
      <SwitchAccount
        handleClose={handleClose}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleLogout={_handleLogout}
        handleSwitchAccount={handleSwitchAccount}
      />
      <PolkadotAccountList
        align="left"
        title="Select account"
        isOpen={showAccountList && extensionInstalled}
        accounts={accounts}
        onSelect={handleSelectedSubstrateAccount}
        onClose={closeAccountList}
      />
    </>
  );
};
