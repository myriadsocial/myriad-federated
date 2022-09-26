import {useQuery} from '@tanstack/react-query';

import React, {useEffect, useState} from 'react';

import {useRouter} from 'next/router';

import {getReports} from 'src/api/GET_Reports';
import {DropdownFilter} from 'src/components/atoms';
import ChartBar from 'src/components/atoms/ChartBar';
import ChartDoughnat from 'src/components/atoms/ChartDoughnut';
import ChartPie from 'src/components/atoms/ChartPie';
import ChartTopCoint from 'src/components/atoms/ChartTopCoint';
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

  const filter = JSON.stringify({
    where: {status: 'pending', referenceType: {inq: ['post', 'comment']}},
    order: [`createdAt ${sortingDate}`],
  });

  const {refetch: refetchingGetAllPost, data: dataPostReported} = useQuery(
    ['/getAllPost'],
    () => getReports({pageNumber, filter}),
    {
      enabled: false,
    },
  );

  const {refetch: refetchingGetAllUser, data: dataUserReported} = useQuery(
    ['/getAllUser'],
    () => getReports({pageNumber, filter}),
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
          totalPost={selectedInstance?.detail?.metric?.totalPosts as number}
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
            data={dataPostReported}
            pressButton={() => router.push('dashboard/post')}
          />
          <CardRecentReported
            title="Recent reported post"
            data={dataUserReported}
            pressButton={() => router.push('dashboard/user')}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Post Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <ChartDoughnat />
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Top 5 Coins</div>
            <ChartTopCoint />
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Wallet Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <ChartPie />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};
