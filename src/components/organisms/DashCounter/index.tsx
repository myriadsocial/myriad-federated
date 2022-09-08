import React from 'react';

import CardTotal from 'src/components/molecules/CardTotal';

import {IcCountExperiance, IcCountPost, IcCountTip, IcCountUser} from 'public/icons';

export default function DashCounter() {
  return (
    <div className="grid grid-cols-4 gap-6 my-6">
      <CardTotal image={IcCountUser} count={'86'} label={'Total users'} />
      <CardTotal image={IcCountPost} count={'360'} label={'Total posts'} />
      <CardTotal image={IcCountExperiance} count={'86'} label={'Total experiences'} />
      <CardTotal image={IcCountTip} count={'86'} label={'Total tips'} />
    </div>
  );
}
