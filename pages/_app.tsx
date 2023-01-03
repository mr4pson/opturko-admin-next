import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  getAccessToken,
  getUserInfo,
} from '../common/helpers/jwt-token.helper';
import { ToastContainer } from 'react-toastify';
import { AppWithPageLayout } from '../common/types';
import { Global } from '../components/common';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/slicers/authSlicer';
import { wrapper } from '../redux/store';
import { OpenAPI } from '../swagger/autogen';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }: AppWithPageLayout) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  OpenAPI.BASE = '/api';

  useEffect(() => {
    const user = getUserInfo();
    OpenAPI.TOKEN = getAccessToken() ?? '';

    if (!user && router.pathname.includes('/admin')) {
      router.push('/admin/login');
    }

    dispatch(setUser(user));
  }, [dispatch]);

  return (
    <>
      <Global />
      <ToastContainer />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} key={router.asPath} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default wrapper.withRedux(App);
