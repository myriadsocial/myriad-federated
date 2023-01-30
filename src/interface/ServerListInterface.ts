export interface ServerListProps {
  id: number;
  owner: string;
  apiUrl: string;
  stakedAmount: string;
  unstakedAt: number;
  detail?: ServerDetail;
}

export interface MetricPostInterface {
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
export interface AverageInterface {
  averagePost: number;
  averageComment: number;
  averageExperience: number;
  averageTransaction: number;
  averageSubscription: number;
}

export interface MetricTotalWalletsInterface {
  totalNearWallet: number;
  totalSubstrateWallet: number;
}

export interface MetricTotalConnectedSocialInterface {
  totalConnectedReddit: number;
  totalConnectedTwitter: number;
}
export interface ServerDetail {
  id: string;
  name: string;
  serverImageURL: string;
  description: string;
  categories: string[];
  metric: {
    totalExperiences: number;
    totalTransactions: number;
    totalUsers: number;
    totalVotes: number;
    totalPosts: MetricPostInterface;
    totalWallets: MetricTotalWalletsInterface;
    totalConnectedSocials: MetricTotalConnectedSocialInterface;
  };
  images: {
    logo_banner: string;
  };
  mendian: MedianInterface;
}
