export interface ServerListProps {
  id: string;
  name: string;
  owner: string;
  apiUrl: string;
  webUrl: string;
  detail?: ServerDetail;
}

export interface ServerDetail {
  id: string;
  description: string;
  name: string;
  categories: string[];
  metric: {
    totalExperiences: number;
    totalPosts: number;
    totalTransactions: number;
    totalUsers: number;
    totalVotes: number;
  };
  images: {
    logo_banner: string;
  };
}
