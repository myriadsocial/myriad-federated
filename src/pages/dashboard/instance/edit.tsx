import {ReactNode} from 'react';

import {GetServerSidePropsContext} from 'next';

import cookie from 'cookie';

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = cookie.parse(context?.req?.headers?.cookie ?? '');
  const server = cookies?.session ?? '';

  try {
    const data = JSON.parse(server);
    if (!data?.apiURL || !data?.token) throw 'DataNotFound';
  } catch {
    return {
      redirect: {
        destination: '/instance',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

EditInstance.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
