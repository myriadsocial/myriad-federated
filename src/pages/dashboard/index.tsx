import {IcDebio, IcKusama, IcMyriad, IcNear, IcPolkadot} from 'public/icons';
import {ReactNode, useState} from 'react';
import {DropdownFilter} from 'src/components/atoms';
import {Arrays} from 'src/constans/array';
import ContentLayout from '../../layout/ContentLayout';
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
import Image from 'next/image';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import CardRecentReported from 'src/components/organisms/CardRecentReported';
import DashCounter from 'src/components/organisms/DashCounter';

const labels = [
  '11/07',
  '12/07',
  '13/07',
  '14/07',
  '15/07',
  '16/07',
  '17/07',
  '18/07',
  '19/07',
  '20/07',
];

export const dataUserGrowth = {
  labels,
  datasets: [
    {
      label: '',
      data: [2, 4, 34, 3, 5, 63, 21, 3, 35, 6],
      backgroundColor: '#9CCC42',
      borderRadius: 20,
      minBarLength: 24,
    },
  ],
};

export const dataPostPersentage = {
  labels: ['Myriad post', 'Import Twitter post', 'Import Reddit post'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['#7342CC', '#FFC857', '#9CCC42'],
      borderWidth: 1,
    },
  ],
};
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const optionsUserGrowth = {
  responsive: true,
  plugins: {
    maintainAspectRatio: true,
    legend: {
      position: 'bottom' as const,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export const optionsPie = {
  responsive: false,
  plugins: {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
      },
    },
  },
};

const dataTopCoint = [
  {
    image: IcKusama,
    coint: 10,
  },
  {
    image: IcPolkadot,
    coint: 10,
  },
  {
    image: IcNear,
    coint: 30,
  },
  {
    image: IcMyriad,
    coint: 40,
  },
  {
    image: IcDebio,
    coint: 10,
  },
];
export default function Dashboard() {
  const [sortingDate, setSortingDate] = useState<string>('DESC');

  return (
    <div className="bg-background-content">
      <div className="my-6">
        <DropdownFilter
          label="Period"
          data={Arrays.dataFilter ?? []}
          value={sortingDate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSortingDate(event.target.value)
          }
        />
        <DashCounter />
        <div className="grid grid-cols-4 gap-6 pb-6 h-[340px]">
          <div className="col-span-2 p-5 bg-white shadow-lg rounded-2xl h-[320px] relative">
            <div className="text-lg font-semibold pb-4">User Growth</div>
            <div className="flex">
              <Bar options={optionsUserGrowth} data={dataUserGrowth} height={100} />
            </div>
          </div>
          <CardRecentReported title="Recent reported user" />
          <CardRecentReported title="Recent reported post" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Post Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <Doughnut data={dataPostPersentage} options={optionsPie} height={175} />
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Top 5 Coints</div>
            <div className="grid gap-5 mt-6">
              {dataTopCoint
                .sort((a, b) => b.coint - a.coint)
                .map((item, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <Image alt={item.image} src={item.image} height={32} width={32} />
                      <div
                        className={`bg-[#CC42BE] h-6 rounded ml-2`}
                        style={{width: (item.coint / 100) * 100 + '%'}}
                      />
                      <div className="ml-2 text-[#616161] ">{item.coint}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-lg font-semibold">Wallet Statistics</div>
            <div className="h-full w-full flex justify-center items-center">
              <Pie data={dataPostPersentage} options={optionsPie} height={175} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};
