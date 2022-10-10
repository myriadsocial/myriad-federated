import ListMedian from 'src/components/atoms/ListMedian';
import { MedianInterface } from 'src/interface/ServerListInterface';

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
  item: MedianInterface | undefined;
}) {
  return (
    <div className="grid gap-4">
      <ListMedian
        image={IcCountPost}
        count={item?.medianPost ?? 0}
        title={'Post Per User'}
      />
      <ListMedian
        image={IcCountExperiance}
        count={item?.medianExperience ?? 0}
        title={'Experience Per User'}
      />
      <ListMedian
        image={CountComments}
        count={item?.medianComment ?? 0}
        title={'Comments Per User'}
      />
      <ListMedian
        image={CountTips}
        count={item?.medianTransaction ?? 0}
        title={'Transaction Per User'}
      />
      <ListMedian
        image={CountSubscriptions}
        count={item?.medianSubscription ?? 0}
        title={'Subscriptions Per User'}
      />
    </div>
  );
}
