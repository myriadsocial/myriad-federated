import { ReactElement } from 'react';

import ContentLayout from '../../../layout/ContentLayout';

import type { NextPageWithLayout } from '../../_app';

const Help: NextPageWithLayout = () => {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Help</h1>
    </div>
  );
};

Help.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Help">{page}</ContentLayout>;
};

export default Help;
