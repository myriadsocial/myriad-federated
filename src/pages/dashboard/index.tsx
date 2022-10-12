import { useQuery } from '@tanstack/react-query';
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
import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getReports } from 'src/api/GET_Reports';
import { getServersMatric } from 'src/api/GET_serversMatric';
import { getTopCurrencies } from 'src/api/GET_TopCurrencies';
import { getUsersGrowth } from 'src/api/GET_UsersGrowth';
import { DropdownFilter } from 'src/components/atoms';
import ChartBar from 'src/components/molecules/ChartBar';
import ChartDoughnat from 'src/components/molecules/ChartDoughnut';
import ChartPie from 'src/components/molecules/ChartPie';
import ChartTopCoint from 'src/components/molecules/ChartTopCoint';
import ShowIf from 'src/components/molecules/common/show-if.component';
import MedianStatistics from 'src/components/molecules/MedianStatistics';
import CardRecentReported from 'src/components/organisms/CardRecentReported';
import DashCounter from 'src/components/organisms/DashCounter';
import { Arrays } from 'src/constans/array';
import { useAuth } from 'src/hooks/use-auth.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';
import ContentLayout from '../../layout/ContentLayout';
import type { NextPageWithLayout } from '../_app';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const { cookie } = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const [sortingDate, setSortingDate] = useState<string>('DESC');
  const pageNumber = 1;

  const filterPost = JSON.stringify({
    where: { status: 'pending', referenceType: { inq: ['post', 'comment'] } },
    order: [`createdAt ${sortingDate}`],
  });

  const filterUser = JSON.stringify({
    where: { status: 'pending', referenceType: 'user' },
    order: [`createdAt ${sortingDate}`],
  });

  const { refetch: refecthingPostReported, data: dataPostReported } = useQuery(
    ['/getAllPost'],
    () => getReports({ pageNumber, filter: filterPost }),
    {
      enabled: false,
    },
  );

  const { refetch: refecthingAllUser, data: dataUserReported } = useQuery(
    ['/getAllUser'],
    () => getReports({ pageNumber, filter: filterUser }),
    {
      enabled: false,
    },
  );

  const { refetch: refecthingTopCurrencies, data: dataTopCurrencies } =
    useQuery(['/getTopCurrencies'], () => getTopCurrencies(), {
      enabled: false,
    });
  const { refetch: refecthingUserGrowth, data: dataUsersGrowth } = useQuery(
    ['/getUserGrowth'],
    () => getUsersGrowth(),
    {
      enabled: false,
    },
  );
  const { refetch: refecthingServerMatric, data: dataServerMatric } = useQuery(
    ['/getServerMatric'],
    () => getServersMatric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refecthingAllUser();
    refecthingPostReported();
    refecthingServerMatric();
    refecthingTopCurrencies();
    refecthingUserGrowth();
  }, [
    refecthingAllUser,
    refecthingPostReported,
    refecthingServerMatric,
    refecthingTopCurrencies,
    refecthingUserGrowth,
    selectedInstance.id,
  ]);

  return (
    <div className="bg-background-content">
      <div className="my-6">
        <DropdownFilter
          label="Period"
          data={Arrays.dashboardFilter ?? []}
          value={sortingDate}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSortingDate(event.target.value)
          }
        />
        <DashCounter
          totalUser={dataServerMatric?.metric?.totalUsers as number}
          totalPost={dataServerMatric?.metric?.totalPosts.totalAll as number}
          totalExperiances={
            dataServerMatric?.metric?.totalExperiences as number
          }
          totalTips={dataServerMatric?.metric?.totalTransactions as number}
        />
        <div className="grid grid-cols-4 gap-6 pb-6 h-[340px]">
          <div className="col-span-2 p-5 bg-white shadow-lg rounded-2xl h-[320px] relative">
            <div className="text-lg font-semibold pb-4">User Growth</div>
            <div className="flex">
              <ChartBar data={dataUsersGrowth ?? []} />
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
              <ShowIf condition={dataServerMatric}>
                <ChartDoughnat
                  height={175}
                  data={dataServerMatric?.metric?.totalPosts}
                />
              </ShowIf>
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Top 5 Coins</div>

            <ChartTopCoint data={dataTopCurrencies ?? []} />
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Wallet Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <ShowIf condition={dataServerMatric}>
                <ChartPie data={dataServerMatric?.metric?.totalWallets} />
              </ShowIf>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 my-6">
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl mb-6">
            <div className="text-lg font-semibold mb-6">
              Connected Social Media Account
            </div>
            <div className="w-full flex items-center justify-center">
              <ShowIf condition={dataServerMatric}>
                <ChartDoughnat
                  height={380}
                  data={dataServerMatric?.metric?.totalConnectedSocials}
                />
              </ShowIf>
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl mb-6">
            <div className="text-lg font-semibold mb-6">Median Statistics</div>
            <MedianStatistics item={dataServerMatric?.mendian} />
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};

export default Dashboard;
