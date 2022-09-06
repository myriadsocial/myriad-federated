import nookies from 'nookies';
import {GetServerSidePropsContext} from 'next';
import {ReactNode} from 'react';
import ContentLayout from '../../../layout/ContentLayout';

export default function Help() {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Help</h1>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const session = cookies?.session ?? '';

  try {
    const data = JSON.parse(session);
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
