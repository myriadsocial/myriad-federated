export interface Currency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  decimal: number;
  native: boolean;
  exchangeRate: boolean;
  createdAt: string;
  updatedAt: string;
  networkId: string;
  referenceId?: string;
  amount: number;
}
