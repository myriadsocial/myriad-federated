export interface NotificationDataInterface {
  additionalReferenceId: string;
  createdAt: string;
  from: string;
  id: string;
  message: string;
  read: boolean;
  referenceId: string;
  to: string;
  type: string;
  updatedAt: string;
}

export interface MetaNotificationInterface {
  currentPage: number;
  itemsPerPage: number;
  nextPage: number;
  totalItemCount: number;
  totalPageCount: number;
}

export interface ListAllNotificationsInterface {
  label: string;
  desc: string;
  time: string;
}

export interface ResponseNotificationsInterface {
  data: NotificationDataInterface;
  meta: MetaNotificationInterface;
}

export type FilterType = 'report_post' | 'report_user' | 'report_comment' | 'all';
