import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { ReactElement, useEffect } from 'react';
import { getServersMatric } from 'src/api/GET_serversMatric';
import { patchEditInstance } from 'src/api/PATCH_EditInstance';
import { useAuth } from 'src/hooks/use-auth.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import CardEditInstance from '../../../components/molecules/CardEditInstance';
import ContentLayout from '../../../layout/ContentLayout';

import type { NextPageWithLayout } from '../../_app';

const EditInstance: NextPageWithLayout = () => {
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
        <CardEditInstance data={dataServerMatric} />
      </div>
    </div>
  );
};

EditInstance.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};

export default EditInstance;
