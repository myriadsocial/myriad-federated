import { useQuery } from '@tanstack/react-query';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import { getServersMatric } from 'src/api/GET_serversMatric';
import { useAuth } from 'src/hooks/use-auth.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import CardEditInstance from '../../../components/molecules/CardEditInstance';
import ContentLayout from '../../../layout/ContentLayout';

import { decryptMessage } from 'src/lib/crypto';

export default function EditInstance({ accessToken }: { accessToken: string }) {
  const { cookie } = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const { refetch: refetchingServerMatric, data: dataServerMatric } = useQuery(
    ['/getServerMatric'],
    () => getServersMatric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchingServerMatric();
  }, [refetchingServerMatric]);

  return (
    <div className="h-full">
      <div className="flex">
        <CardEditInstance data={dataServerMatric} accessToken={accessToken} />
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

// export default EditInstance;
