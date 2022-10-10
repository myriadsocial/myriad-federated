import { ReactElement } from 'react';

import CardEditInstance from '../../../components/molecules/CardEditInstance';
import CardInstanceRight from '../../../components/molecules/CardInstanceRight';
import ContentLayout from '../../../layout/ContentLayout';

import type { NextPageWithLayout } from '../../_app';

const EditInstance: NextPageWithLayout = () => {
  return (
    <div className="h-full">
      <div className="flex">
        <CardEditInstance />
        <CardInstanceRight />
      </div>
    </div>
  );
};

EditInstance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};

export default EditInstance;
