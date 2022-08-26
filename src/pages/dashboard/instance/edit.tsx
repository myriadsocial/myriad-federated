import {ReactNode} from 'react';
import CardEditInstance from '../../../components/molecules/CardEditInstance';
import CardInstanceRight from '../../../components/molecules/CardInstanceRight';
import ContentLayout from '../../../layout/ContentLayout';

export default function EditInstance() {
  return (
    <div className="h-full">
      <div className="flex">
        <CardEditInstance />
        <CardInstanceRight />
      </div>
    </div>
  );
}

EditInstance.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
