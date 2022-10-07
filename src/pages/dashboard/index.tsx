import {useQuery} from '@tanstack/react-query';

import React, {useEffect, useState} from 'react';

import {useRouter} from 'next/router';

import {getReports} from 'src/api/GET_Reports';
import {DropdownFilter} from 'src/components/atoms';
import ChartBar from 'src/components/molecules/ChartBar';
import ChartDoughnat from 'src/components/molecules/ChartDoughnut';
import ChartPie from 'src/components/molecules/ChartPie';
import ChartTopCoint from 'src/components/molecules/ChartTopCoint';
import MedianStatistics from 'src/components/molecules/MedianStatistics';
import CardRecentReported from 'src/components/organisms/CardRecentReported';
import DashCounter from 'src/components/organisms/DashCounter';
import {Arrays} from 'src/constans/array';
import {useAuth} from 'src/hooks/use-auth.hook';
import {ServerListProps} from 'src/interface/ServerListInterface';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import ContentLayout from '../../layout/ContentLayout';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();
  const [sortingDate, setSortingDate] = useState<string>('DESC');
  const {cookie} = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const pageNumber = 1;

  const filterPost = JSON.stringify({
    where: {status: 'pending', referenceType: {inq: ['post', 'comment']}},
    order: [`createdAt ${sortingDate}`],
  });

  const filterUser = JSON.stringify({
    where: {status: 'pending', referenceType: 'user'},
    order: [`createdAt ${sortingDate}`],
  });

  const {refetch: refetchingGetAllPost, data: dataPostReported} = useQuery(
    ['/getAllPost'],
    () => getReports({pageNumber, filter: filterPost}),
    {
      enabled: false,
    },
  );

  const {refetch: refetchingGetAllUser, data: dataUserReported} = useQuery(
    ['/getAllUser'],
    () => getReports({pageNumber, filter: filterUser}),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchingGetAllPost();
    refetchingGetAllUser();
  }, [sortingDate, refetchingGetAllPost, refetchingGetAllUser]);

  return (
    <div className="bg-background-content">
      <div className="my-6">
        <DropdownFilter
          label="Period"
          data={Arrays.dashboardFilter ?? []}
          value={sortingDate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSortingDate(event.target.value)
          }
        />
        <DashCounter
          totalUser={selectedInstance?.detail?.metric?.totalUsers as number}
          totalPost={selectedInstance?.detail?.metric?.totalPosts.totalAll as number}
          totalExperiances={selectedInstance?.detail?.metric?.totalExperiences as number}
          totalTips={selectedInstance?.detail?.metric?.totalTransactions as number}
        />
        <div className="grid grid-cols-4 gap-6 pb-6 h-[340px]">
          <div className="col-span-2 p-5 bg-white shadow-lg rounded-2xl h-[320px] relative">
            <div className="text-lg font-semibold pb-4">User Growth</div>
            <div className="flex">
              <ChartBar />
            </div>
          </div>
          <CardRecentReported
            title="Recent reported user"
            data={dataUserReported}
            pressButton={() => router.push('dashboard/user')}
          />
          <CardRecentReported
            title="Recent reported post"
            data={dataPostReported}
            pressButton={() => router.push('dashboard/post')}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Post Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <ChartDoughnat height={175} data={selectedInstance?.detail?.metric.totalPosts} />
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Top 5 Coins</div>
            <ChartTopCoint />
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Wallet Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <ChartPie data={selectedInstance?.detail?.metric.totalWallets} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 my-6">
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl mb-6">
            <div className="text-lg font-semibold mb-6">Connected Social Media Account</div>
            <div className="w-full flex items-center justify-center">
              <ChartDoughnat
                height={380}
                data={selectedInstance?.detail?.metric.totalConnectedSocials}
              />
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl mb-6">
            <div className="text-lg font-semibold mb-6">Median Statistics</div>
            <MedianStatistics item={selectedInstance?.detail?.mendian} />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};
