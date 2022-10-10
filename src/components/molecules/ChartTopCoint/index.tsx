import Image from 'next/image';
import { ChartTopPointInterface } from 'src/interface/DashboardInterface';

export default function ChartTopCoint({
  data,
}: {
  data: Array<ChartTopPointInterface>;
}) {
  const dataTotal = data
    .map((item) => {
      return item.totalTransactions;
    })
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  return (
    <div className="grid gap-5 mt-6">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex items-center">
            <Image
              alt={item.name}
              src={item.image}
              height={32}
              width={32}
              className="rounded-full"
            />
            <div
              className={`bg-[#CC42BE] h-6 rounded ml-2`}
              style={{
                width: (item.totalTransactions / dataTotal) * 100 + '%',
              }}
            />
            <div className="ml-2 text-[#616161] ">{item.totalTransactions}</div>
          </div>
        );
      })}
    </div>
  );
}
