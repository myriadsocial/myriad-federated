export interface ServerListProps {
  id: number;
  owner: string;
  apiUrl: string;
  detail?: ServerDetail;
}

export interface MetricInterface {
  totalMyriad: number;
  totalTwitter: number;
  totalReddit: number;
  totalAll: number;
}

export interface MedianInterface {
  medianPost: number;
  medianComment: number;
  medianExperience: number;
  medianTransaction: number;
  medianSubscription: number;
}
export interface ServerDetail {
  id: string;
  name: string;
  serverImageURL: string;
  description: string;
  categories: string[];
  metric: {
    totalExperiences: number;
    totalPosts: MetricInterface;
    totalTransactions: number;
    totalUsers: number;
    totalVotes: number;
  };
  images: {
    logo_banner: string;
  };
  mendian: MedianInterface;
}
