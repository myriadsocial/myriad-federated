import {ReactNode} from 'react';

import {GetServerSidePropsContext} from 'next';

import cookie from 'cookie';

import ContentLayout from '../../../layout/ContentLayout';

export default function Help() {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Help</h1>
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

Help.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Help">{page}</ContentLayout>;
};
