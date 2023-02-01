import { Currency } from 'src/interface/CurrencyInterface';

import axios from './axiosInstance';

export const getCurrencies = async (
  url: string,
  networkId: string,
  ftIdentifiers: string[],
): Promise<Currency[] | undefined> => {
  if (ftIdentifiers.length === 0) return [];

  const filter = {
    where: {
      networkId,
      or: [] as any[],
    },
  };

  if (ftIdentifiers[0] === 'native') {
    ftIdentifiers.shift();
    filter.where.or.push({
      native: true,
    });
  }

  filter.where.or.push({
    referenceId: {
      inq: ftIdentifiers,
    },
  });

  try {
    const { data } = await axios().get(`${url}/currencies`, {
      params: {
        filter: JSON.stringify(filter),
      },
    });

    return data.data;
  } catch {
    // ignore
  }
};
