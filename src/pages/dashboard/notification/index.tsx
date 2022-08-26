import {CircularProgress, Typography} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {ReactNode, useEffect, useState} from 'react';
import {getNotifications} from '../../../api/GET_Notifications';
import {DropdownFilter, ListAllNotifications} from '../../../components/atoms';
import EmptyState from '../../../components/molecules/EmptyState';
import {Arrays} from '../../../constans/array';
import {
  FilterType,
  MetaNotificationInterface,
  NotificationDataInterface,
} from '../../../interface/NotificationsInterface';
import ContentLayout from '../../../layout/ContentLayout';
import {dateFormatter} from '../../../utils/dateFormatter';

export default function Notification() {
  const [dataNotification, setDataNotification] = useState<Array<NotificationDataInterface>>([]);
  const [metaNotification, setMetaNotification] = useState<MetaNotificationInterface>();
  const [filterReport, setFilterReport] = useState<FilterType>('all');
  const [pageNumber, setPageNumber] = useState<number>(1);

  const filter = {
    where: {
      type: {
        inq:
          filterReport === 'all'
            ? ['report_post', 'report_user', 'report_comment']
            : [filterReport],
      },
    },
  };

  const {refetch: refetchingGetNotification, isFetching} = useQuery(
    ['/getNotification'],
    () => getNotifications({pageNumber, filter}),
    {
      enabled: false,
      onSuccess: data => {
        setDataNotification(data?.data);
        setMetaNotification(data?.meta);
      },
    },
  );

  useEffect(() => {
    refetchingGetNotification();
  }, [filterReport, refetchingGetNotification, pageNumber]);

  return (
    <div className="bg-white mr-6 p-6 rounded-[10px] h-min-[480px]">
      <div className="mb-[5px]">
        <Typography fontWeight={600} fontSize={18} textTransform="capitalize">
          {filterReport === 'all' ? 'All notifications' : filterReport.replace('_', ' ')}
        </Typography>
      </div>
      <Typography fontSize={14} fontWeight={400} color={'#757575'}>
        {metaNotification?.totalItemCount} notifications
      </Typography>

      <div className="my-6">
        <DropdownFilter
          label="Filter"
          data={Arrays.notificationFilter ?? []}
          value={filterReport}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterReport(event.target.value as FilterType)
          }
        />
      </div>

      <div className="min-h-[350px]">
        {!isFetching && dataNotification?.toString().length === 0 && (
          <div className="h-[300px] w-full flex items-center justify-center">
            <EmptyState />
          </div>
        )}
        {isFetching ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          dataNotification?.map((item, index) => {
            return (
              <ListAllNotifications
                key={index}
                label={item.message}
                desc={item.type}
                time={dateFormatter(new Date(item.updatedAt), 'dd MMMM yyyy')}
              />
            );
          })
        )}
      </div>
      {(metaNotification?.currentPage ?? 0) > 0 && (
        <div className="flex items-center gap-2 justify-end mb-[10px] text-[14px] mt-4">
          {metaNotification?.currentPage !== 1 && (
            <button onClick={() => setPageNumber(pageNumber - 1)} className="text-slate-600">
              {'<'}
            </button>
          )}
          <div className="h-[28px] w-[28px] rounded-md border-2 items-center justify-center flex ring-slate-600 px-2">
            {metaNotification?.currentPage}
          </div>
          <div>of {metaNotification?.totalPageCount}</div>
          {metaNotification?.totalPageCount === metaNotification?.currentPage ? null : (
            <button onClick={() => setPageNumber(pageNumber + 1)} className="text-slate-600">
              {'>'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

Notification.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Notification">{page}</ContentLayout>;
};
