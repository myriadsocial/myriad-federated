import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
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

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={themeV2}>
      <SnackbarProvider maxSnack={4}>
        <BlockchainProvider>
          <CookiesProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
          </CookiesProvider>
        </BlockchainProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
