import React from 'react';

import CardTotal from 'src/components/molecules/CardTotal';

import {
  IcCountExperiance,
  IcCountPost,
  IcCountTip,
  IcCountUser,
} from 'public/icons';

interface DashCounterInterface {
  totalUser: number;
  totalPost: number;
  totalExperiances: number;
  totalTips: number;
}

export default function DashCounter(props: DashCounterInterface) {
  const { totalUser, totalPost, totalExperiances, totalTips } = props;
  return (
    <div className="grid grid-cols-4 gap-6 my-6">
      <CardTotal
        image={IcCountUser}
        count={totalUser ?? 0}
        label={'Total users'}
      />
      <CardTotal
        image={IcCountPost}
        count={totalPost ?? 0}
        label={'Total posts'}
      />
      <CardTotal
        image={IcCountExperiance}
        count={totalExperiances ?? 0}
        label={'Total timelines'}
      />
      <CardTotal
        image={IcCountTip}
        count={totalTips ?? 0}
        label={'Total Transaction'}
      />
    </div>
  );
}
