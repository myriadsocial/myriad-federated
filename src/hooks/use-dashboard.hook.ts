import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getReports } from 'src/api/GET_Reports';
import { getServersMetric } from 'src/api/GET_serversMetric';
import { getAverageStats } from 'src/api/GET_stats';
import { getTopCurrencies } from 'src/api/GET_TopCurrencies';
import { getUsersGrowth } from 'src/api/GET_UsersGrowth';
import { ServerListProps } from 'src/interface/ServerListInterface';
import { useAuth } from './use-auth.hook';

export const useDashboard = () => {
  const { cookie } = useAuth();

  const [sortingDate, setSortingDate] = useState('DESC');

  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const pageNumber = 1;

  const filterPost = JSON.stringify({
    where: { status: 'pending', referenceType: { inq: ['post', 'comment'] } },
    order: [`createdAt ${sortingDate}`],
  });

  const filterUser = JSON.stringify({
    where: { status: 'pending', referenceType: 'user' },
    order: [`createdAt ${sortingDate}`],
  });

  const { refetch: refetchingPostReported, data: dataPostReported } = useQuery(
    ['/getAllPost'],
    () => getReports({ pageNumber, filter: filterPost }),
    {
      enabled: false,
    },
  );

  const { refetch: refetchingAllUser, data: dataUserReported } = useQuery(
    ['/getAllUser'],
    () => getReports({ pageNumber, filter: filterUser }),
    {
      enabled: false,
    },
  );

  const { refetch: refetchingTopCurrencies, data: dataTopCurrencies } =
    useQuery(['/getTopCurrencies'], () => getTopCurrencies(), {
      enabled: false,
    });

  const { refetch: refetchingUserGrowth, data: dataUsersGrowth } = useQuery(
    ['/getUserGrowth'],
    () => getUsersGrowth(),
    {
      enabled: false,
    },
  );

  const { refetch: refetchingServerMetric, data: dataServerMetric } = useQuery(
    ['/getServerMetric'],
    () => getServersMetric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  const { refetch: refetchingAverageStats, data: dataAverageStats } = useQuery(
    ['/getAverageStats'],
    () => getAverageStats({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchingAllUser();
    refetchingPostReported();
    refetchingServerMetric();
    refetchingTopCurrencies();
    refetchingUserGrowth();
    refetchingAverageStats();
  }, [
    refetchingAllUser,
    refetchingPostReported,
    refetchingServerMetric,
    refetchingTopCurrencies,
    refetchingUserGrowth,
    refetchingAverageStats,
    selectedInstance.id,
  ]);
  return {
    dataPostReported,
    dataServerMetric,
    dataTopCurrencies,
    dataUserReported,
    dataUsersGrowth,
    sortingDate,
    dataAverageStats,
    onChangeSortingDate: setSortingDate,
  };
};
