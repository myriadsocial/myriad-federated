import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {ReactElement, ReactNode} from 'react';
import {CookiesProvider} from 'react-cookie';

import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic';

import {ThemeProvider} from '@material-ui/core/styles';

import {SnackbarProvider} from 'notistack';

import '../../styles/globals.css';
import themeV2 from '../themes/light-theme';

const BlockchainProvider = dynamic(
  () => import('src/components/molecules/common/Blockchain/Blockchain.provider'),
  {ssr: false},
);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const dehydratedState = dehydrate(queryClient, {});

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ThemeProvider theme={themeV2}>
      <SnackbarProvider maxSnack={4}>
        <BlockchainProvider>
          <CookiesProvider>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={dehydratedState}>
                <ReactQueryDevtools initialIsOpen={false} />
                {getLayout(<Component {...pageProps} />)}
              </Hydrate>
            </QueryClientProvider>
          </CookiesProvider>
        </BlockchainProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
