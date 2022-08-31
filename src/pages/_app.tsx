import type {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import themeV2 from '../themes/light-theme';
import {NextPage} from 'next';
import {ReactElement, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import '../../styles/globals.css';

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
