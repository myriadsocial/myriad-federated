import {ReactNode} from 'react';
import ContentLayout from '../../../layout/ContentLayout';

export default function Help() {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Help</h1>
    </div>
  );
}

Help.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Help">{page}</ContentLayout>;
};
