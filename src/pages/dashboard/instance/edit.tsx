import nookies from 'nookies';
import {GetServerSidePropsContext} from 'next';
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

EditInstance.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
