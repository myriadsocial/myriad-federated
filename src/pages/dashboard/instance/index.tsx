import { ColumnDef } from '@tanstack/react-table';

import { ReactElement } from 'react';

import { Typography } from '@mui/material';

import CardInstanceLeft from '../../../components/molecules/CardInstanceLeft';
import CardInstanceRight from '../../../components/molecules/CardInstanceRight';
import Table from '../../../components/organisms/Table';
import ContentLayout from '../../../layout/ContentLayout';

import type { NextPageWithLayout } from '../../_app';

interface DataArtSpaceInterface {
  displayName: string;
  username: string;
  date: string;
  walletType: string;
  walletAddress: string;
}
const Instance: NextPageWithLayout = () => {
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

  return (
    <div className="h-full">
      <div className="flex">
        <CardInstanceLeft />
        <CardInstanceRight />
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
