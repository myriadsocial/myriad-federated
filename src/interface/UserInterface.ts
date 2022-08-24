export type ReportType =
  | 'abusive_violent'
  | 'unauthorize_copyright'
  | 'child_exploitation'
  | 'pornography'
  | 'private_information'
  | 'spam'
  | 'unauthorize_trademark';
export interface UserDetailInterface {
  createdAt: string;
  id: string;
  profilePictureURL: string;
  username: string;
  name: string;
}
export interface ReportDetailInterface {
  platform: string;
  text: string;
  user: UserDetailInterface;
}

export interface ReportersInterface {
  createdAt: string;
  description: string;
  id: string;
  referenceType: string;
  reportId: string;
  reportedBy: string;
  updatedAt: string;
}
export interface metricInterface {
  totalExperiences: number;
  totalFriends: number;
  totalKudos: number;
  totalPosts: number;
}
export interface ReportsDetailInterface {
  bannerImageURL: string;
  createAt: string;
  id: string;
  name: string;
  onTimeline: string;
  profilePictureURL: string;
  updatedAt: string;
  username: string;
  verified: boolean;
  fcmTokens: Array<string>;
  metric: metricInterface;
}
export interface DataResponseUserReportedInterface {
  createdAt: string;
  id: string;
  referenceId: string;
  referenceType: string;
  reportedDetail: ReportDetailInterface;
  reporters?: ReportersInterface;
  reporter?: ReportsDetailInterface;
  status: string;
  totalReported: number;
  type: string;
  updatedAt: string;
  description?: string;
}

export interface MetaResponseUserReportedInterface {
  currentPage: number;
  itemsPerPage: number;
  nextPage: number;
  totalItemCount: number;
  totalPageCount: number;
}
export interface ResponseUserReported {
  data: DataResponseUserReportedInterface;
  meta: MetaResponseUserReportedInterface;
}

export const ReportTypeCategoryMapper: Record<ReportType, string> = {
  abusive_violent: 'Abusive behavior and violent threats',
  unauthorize_copyright: 'Unauthorized use of copyrighted materials',
  child_exploitation: 'Child sexual exploitation',
  pornography: 'Pornography (No NSFW Tag)',
  private_information: 'Private information posted on Myriad',
  spam: 'Spam and system abuse',
  unauthorize_trademark: 'Unauthorized trademark',
};
