// import '../styles/globals.css'
import { Layout } from '../components/layouts/Layout';
import type { AppProps } from 'next/app';
import '../styles/app.css';
import '../styles/custom.css';
import Head from 'next/head';
import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';
import { wrapper } from '../stores/store';
import { Provider } from 'react-redux';
import AuthChecker from '../components/features/AuthChecker';
import { useRouter } from 'next/router';
// import Script from "next/script";

const ROUTES_WITHOUT_LAYOUT = ['/404'];

const CourseMgmtApp = ({ Component, ...any }: AppProps) => {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(any);
  const { pageProps } = props;

  return (
    <>
      <Provider store={store}>
        <QueryParamProvider adapter={NextAdapter}>
          <Head>
            <meta
              name="viewport"
              id="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          {!ROUTES_WITHOUT_LAYOUT.includes(router.pathname) ? (
            <Layout>
              <AuthChecker />
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </QueryParamProvider>
      </Provider>
    </>
  );
};

export default CourseMgmtApp;
