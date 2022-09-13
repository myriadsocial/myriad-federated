import {useMutation, useQuery} from '@tanstack/react-query';
import {ColumnDef} from '@tanstack/react-table';

import {ReactNode, useEffect, useState} from 'react';

import {GetServerSidePropsContext} from 'next';
import Image from 'next/image';

import {CircularProgress, Typography} from '@mui/material';

import cookie from 'cookie';

import {IcOpenUrl} from '../../../../public/icons';
import {deleteReports} from '../../../api/DELETE_Reports';
import {getReports} from '../../../api/GET_Reports';
import {getReportsDetail} from '../../../api/GET_ReportsDetail';
import {AvatarWithName, DropdownFilter} from '../../../components/atoms';
import Button from '../../../components/atoms/Button';
import ListReporter from '../../../components/atoms/ListReporter';
import Modal from '../../../components/molecules/Modal';
import Table from '../../../components/organisms/Table';
import {Arrays} from '../../../constans/array';
import {DataResponseUserReportedInterface} from '../../../interface/UserInterface';
import ContentLayout from '../../../layout/ContentLayout';
import {dateFormatter} from '../../../utils/dateFormatter';

export default function UserResponded() {
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState('ASC');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reportId, setReportId] = useState<string | undefined>(undefined);

  const columns: ColumnDef<DataResponseUserReportedInterface>[] = [
    {
      accessorKey: 'reportedDetail',
      header: 'Reported user',
      cell: value => (
        <AvatarWithName
          image={value.row.original.reportedDetail.user.profilePictureURL}
          name={value.row.original.reportedDetail.user.name}
          desc={value.row.original.reportedDetail.user.username}
        />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Report Date',
      size: 120,
      cell: value => (
        <div className="text-sm">
          {dateFormatter(new Date(value.row.original.createdAt), 'dd/MM/yy')}
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Respond Date',
      size: 120,
      cell: value => (
        <div className="text-sm">
          {dateFormatter(new Date(value.row.original.updatedAt), 'dd/MM/yy')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Penalty Status',
      size: 120,
      cell: value => <div className="text-sm capitalize">{value.row.original.status}</div>,
    },
    {
      accessorKey: 'id',
      header: 'Action',
      cell: value => (
        <Button
          disable={value.row.original.status === 'ignored'}
          onClick={() => handleRespond(value.row.original)}
          label="Respond"
        />
      ),
    },
  ];

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setReportId(value.id);
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const filter = JSON.stringify({
    where: {status: {inq: ['ignored', 'removed']}, referenceType: 'user'},
    order: [`createdAt ${sortingDate}`],
  });

  const {
    refetch: refetchingGetAllUser,
    isFetching,
    data: dataUserResponded,
  } = useQuery(['/getAllUserResponded'], () => getReports({pageNumber, filter}), {
    enabled: false,
  });

  const handleRestore = async () => {
    const response = await mutateDeleteUser({
      reportId: userSelected?.id ?? '',
    });
    if (response) {
      setIsShowModalRespond(false);
      refetchingGetAllUser();
    } else {
      setIsShowModalRespond(false);
      refetchingGetAllUser();
    }
  };

  const {mutateAsync: mutateDeleteUser} = useMutation(deleteReports);

  useEffect(() => {
    refetchingGetAllUser();
  }, [sortingDate, pageNumber, refetchingGetAllUser]);

  const {
    refetch: refetchingAllReporter,
    isFetching: isFetchingReporter,
    data: dataReporter,
  } = useQuery(['/getAllReporter'], () => getReportsDetail({id: reportId}), {
    enabled: false,
  });

  useEffect(() => {
    if (reportId === undefined) return;
    refetchingAllReporter();
  }, [refetchingAllReporter, reportId]);

  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <div className="mb-[5px]">
        <div className="text-lg font-semibold">Responded report</div>
      </div>
      <div className="text-sm text-softGray">
        {dataUserResponded?.meta.totalItemCount ?? '0'} Reports
      </div>
      <div className="my-6">
        <DropdownFilter
          label="Report Date"
          data={Arrays.dataFilter ?? []}
          value={sortingDate}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSortingDate(event.target.value)
          }
        />
      </div>
      <div className="">
        <Table
          data={dataUserResponded?.data ?? []}
          columns={columns}
          meta={dataUserResponded?.meta ?? []}
          onClickNext={() => setPageNumber(dataUserResponded?.meta.nextPage ?? 1)}
          onClickPrevios={() => setPageNumber((dataUserResponded?.meta.currentPage ?? 2) - 1)}
          isFetching={isFetching}
        />
      </div>
      <Modal
        open={isShowModalRespond}
        onClose={() => setIsShowModalRespond(false)}
        title={'Respond'}>
        <div className="mt-[20px]">
          <Typography fontSize={14}>Reported user</Typography>
          <div className="mt-[12px]">
            <AvatarWithName
              image={userSelected?.reportedDetail.user.profilePictureURL as string}
              name={userSelected?.reportedDetail.user.name as string}
              desc={userSelected?.reportedDetail.user.username as string}
            />
          </div>
        </div>
        <div className="mt-[28px] mb-[20px]">
          <div className="text-sm">Detail</div>
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <div className="text-sm text-gray-500 w-[120px]">URL</div>
                <div className="text-sm break-words max-w-[354px]">
                  {`https://app.testnet.myriad.social/profile/${userSelected?.referenceId}`}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-[120px] text-sm text-gray-500">Total reports</div>
                <div className="flex-1 text-sm">{userSelected?.totalReported} report</div>
              </div>
            </div>
            <a
              href={`https://app.testnet.myriad.social/profile/${userSelected?.referenceId}`}
              target="_blank"
              rel="noreferrer">
              <button className="w-[20px]">
                <Image src={IcOpenUrl} height={20} width={20} alt="" />
              </button>
            </a>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Typography fontSize={14}>Reporter</Typography>
          </div>
          {isFetchingReporter ? (
            <CircularProgress />
          ) : (
            dataReporter?.data?.map((item: DataResponseUserReportedInterface) => {
              return <ListReporter data={item} key={item.id} />;
            })
          )}
        </div>
        <div className="flex mt-[28px]">
          <div className="flex-1 mr-3">
            <Button isFullWidth onClick={() => setIsShowModalRespond(false)} label="Cancel" />
          </div>
          <div className="flex-1">
            <Button isFullWidth onClick={handleRestore} primary label="Restore" />
          </div>
        </div>
      </Modal>
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

UserResponded.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="User">{page}</ContentLayout>;
};
