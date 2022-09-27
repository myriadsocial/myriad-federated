import ListMedian from 'src/components/atoms/ListMedian';

import {
  CountComments,
  CountSubscriptions,
  CountTips,
  IcCountExperiance,
  IcCountPost,
} from 'public/icons';

export default function MedianStatistics() {
  return (
    <div className="grid gap-4">
      <ListMedian image={IcCountPost} count={'86'} title={'Post Per User'} />
      <ListMedian image={IcCountExperiance} count={'86'} title={'Experience Per User'} />
      <ListMedian image={CountComments} count={'86'} title={'Comments Per User'} />
      <ListMedian image={CountTips} count={'86'} title={'Tips Per User'} />
      <ListMedian image={CountSubscriptions} count={'86'} title={'Subscriptions Per User'} />
    </div>
  );
}
