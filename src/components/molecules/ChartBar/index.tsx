import { Bar } from 'react-chartjs-2';
import { useWidth } from 'src/utils/calWidthScreen';
import { dateFormatter } from 'src/utils/dateFormatter';

interface UserGrowthInterface {
  date: string;
  count: number;
}

export default function ChartBar({
  data,
}: {
  data: Array<UserGrowthInterface>;
}) {
  const widthScreen = useWidth();
  const optionsUserGrowth = {
    responsive: false,
    plugins: {
      maintainAspectRatio: false,
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
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' new users';
            }
            return label;
          },
        },
      },
    },
  };
  const labels = data
    .slice(0)
    .reverse()
    .map((item) => {
      return dateFormatter(new Date(item.date), 'dd-MM');
    });

  const dataUserGrowth = {
    labels,
    datasets: [
      {
        label: '',
        data: data.map((item) => {
          return item.count;
        }),
        backgroundColor: '#9CCC42',
        borderRadius: 20,
        minBarLength: 24,
      },
    ],
  };
  return (
    <Bar
      options={optionsUserGrowth}
      data={dataUserGrowth}
      height={250}
      width={widthScreen === 'xl' ? 700 : widthScreen === 'lg' ? 500 : 450}
    />
  );
}
