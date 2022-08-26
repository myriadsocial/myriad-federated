import {ReactNode} from 'react';
import ContentLayout from '../../../layout/ContentLayout';

export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

Settings.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Settings">{page}</ContentLayout>;
};
