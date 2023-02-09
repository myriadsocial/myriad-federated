import ListMedian from 'src/components/atoms/ListMedian';
import { AverageInterface } from 'src/interface/ServerListInterface';

import {
  CountComments,
  CountSubscriptions,
  CountTips,
  IcCountExperiance,
  IcCountPost,
} from 'public/icons';

export default function MedianStatistics({
  item,
}: {
  item: AverageInterface | undefined;
}) {
  const numberFormatter = (number: number) => {
    const data = new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3,
    }).format(number);
    return Number(data);
  };
  return (
    <div className="grid gap-4">
      <ListMedian
        image={IcCountPost}
        count={numberFormatter(item?.post as number) ?? 0}
        title={'Post Per User'}
      />
      <ListMedian
        image={IcCountExperiance}
        count={numberFormatter(item?.experience as number) ?? 0}
        title={'Timeline Per User'}
      />
      <ListMedian
        image={CountComments}
        count={numberFormatter(item?.comment as number) ?? 0}
        title={'Comments Per User'}
      />
      <ListMedian
        image={CountTips}
        count={numberFormatter(item?.transaction as number) ?? 0}
        title={'Transaction Per User'}
      />
      <ListMedian
        image={CountSubscriptions}
        count={numberFormatter(item?.subscription as number) ?? 0}
        title={'Subscriptions Per User'}
      />
    </div>
  );
}
