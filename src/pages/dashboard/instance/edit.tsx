import { useQueryClient } from '@tanstack/react-query';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';

import CardEditInstance from '../../../components/molecules/CardEditInstance';
import ContentLayout from '../../../layout/ContentLayout';

import { decryptMessage } from 'src/lib/crypto';

export default function EditInstance({ accessToken }: { accessToken: string }) {
  const queryClient = useQueryClient();
  const dataMatric = queryClient.getQueryData<any>(['/getServerMatric']);

  return (
    <div className="h-full">
      <div className="flex">
        <CardEditInstance data={dataMatric} accessToken={accessToken} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context?.req?.headers?.cookie ?? '');
  const session = JSON.parse(cookies?.session);
  const accessToken = decryptMessage(session.token, session.publicAddress);

  return {
    props: {
      accessToken,
    },
  };
}
EditInstance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
