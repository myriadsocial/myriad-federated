import { ReactElement, useEffect } from 'react';

import CardInstanceLeft from '../../../components/molecules/CardInstanceLeft';
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
    </div>
  );
};

Instance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};

export default Instance;
