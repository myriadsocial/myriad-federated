import { ReactElement, useEffect } from 'react';

import CardInstanceLeft from '../../../components/molecules/CardInstanceLeft';
import ContentLayout from '../../../layout/ContentLayout';

import { useQuery } from '@tanstack/react-query';
import { getServersMetric } from 'src/api/GET_serversMetric';
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

  const { refetch: refetchingServerMetric, data: dataServerMetric } = useQuery(
    ['/getServerMetric'],
    () => getServersMetric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchingServerMetric();
  }, [refetchingServerMetric]);

  return (
    <div className="h-full">
      <div className="flex">
        <CardInstanceLeft data={dataServerMetric} />
      </div>
    </div>
  );
};

Instance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};

export default Instance;
