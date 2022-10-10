import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Fragment, ReactElement, ReactNode, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';

import { NextPage } from 'next';
import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { SnackbarProvider } from 'notistack';

import '../../styles/globals.css';
import theme from '../themes/light-theme';

const BlockchainProvider = dynamic(
  () =>
    import('src/components/molecules/common/Blockchain/Blockchain.provider'),
  { ssr: false },
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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

function MyriadApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Myriad Federated</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
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
    </Fragment>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyriadApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyriadApp;
