import { ColumnDef } from '@tanstack/react-table';

import { ReactElement, useEffect } from 'react';

import { Typography } from '@mui/material';

import CardInstanceLeft from '../../../components/molecules/CardInstanceLeft';
import Table from '../../../components/organisms/Table';
import ContentLayout from '../../../layout/ContentLayout';

import { useQuery } from '@tanstack/react-query';
import { getServersMatric } from 'src/api/GET_serversMatric';
import { useAuth } from 'src/hooks/use-auth.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';
import type { NextPageWithLayout } from '../../_app';

interface DataArtSpaceInterface {
  displayName: string;
  username: string;
  date: string;
  walletType: string;
  walletAddress: string;
}
const Instance: NextPageWithLayout = () => {
  const { cookie } = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const columns: ColumnDef<DataArtSpaceInterface>[] = [
    {
      accessorKey: 'displayName',
      header: 'Display Name',
      size: 268,
    },
    {
      accessorKey: 'username',
      header: 'Username',
      size: 120,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      size: 120,
    },
    {
      accessorKey: 'walletType',
      header: 'Wallet type',
      size: 120,
    },
    {
      accessorKey: 'walletAddress',
      header: 'Wallet address',
      size: 120,
    },
  ];

  const data: DataArtSpaceInterface[] = [
    {
      displayName: 'Raplh Edwards',
      username: '@raphedwars',
      date: '22 Juli 2022',
      walletType: 'Polkadot.js',
      walletAddress: '0x1234...abcd',
    },
    {
      displayName: 'Raplh Edwards',
      username: '@raphedwars',
      date: '22 Juli 2022',
      walletType: 'Polkadot.js',
      walletAddress: '0x1234...abcd',
    },
    {
      displayName: 'Raplh Edwards',
      username: '@raphedwars',
      date: '22 Juli 2022',
      walletType: 'Polkadot.js',
      walletAddress: '0x1234...abcd',
    },
    {
      displayName: 'Raplh Edwards',
      username: '@raphedwars',
      date: '22 Juli 2022',
      walletType: 'Polkadot.js',
      walletAddress: '0x1234...abcd',
    },
    {
      displayName: 'Raplh Edwards',
      username: '@raphedwars',
      date: '22 Juli 2022',
      walletType: 'Polkadot.js',
      walletAddress: '0x1234...abcd',
    },
  ];

  const { refetch: refetchingServerMatric, data: dataServerMatric } = useQuery(
    ['/getServerMatric'],
    () => getServersMatric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchingServerMatric();
  }, [refetchingServerMatric]);

  return (
    <div className="h-full">
      <div className="flex">
        <CardInstanceLeft data={dataServerMatric} />
      </div>
      <div className="bg-white my-6 p-6 rounded-[10px]">
        <div className="mb-[5px]">
          <Typography fontWeight={600} fontSize={18}>
            Art Space users
          </Typography>
        </div>
        <Typography fontSize={14} fontWeight={400} color={'#757575'}>
          3 new users in 24h
        </Typography>
        <div className="mt-6 h-[420px]">
          <Table data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

Instance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};

export default Instance;
