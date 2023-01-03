import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../components/layouts/admin';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return (
    <div>
      <Head>
        <title>Opturko - admin panel</title>
        {/* <meta itemProp="name" content="Cash flow | обмен валют" />
        <meta property="og:title" content="Cash flow | обмен валют" />
        <meta property="og:site_name" content="Cash flow | обмен валют" />
        <meta name="keywords" content="LIST 5-8 KEYWORDS HERE" />
        <meta
          name="description"
          content="Купить / Продать криптовалюту  за наличные. Без комиссий, выгодный курс! Комфортабельный безопасный офис, возможен выезд к вам."
        />
        <meta
          itemProp="description"
          content="Купить / Продать криптовалюту  за наличные. Без комиссий, выгодный курс! Комфортабельный безопасный офис, возможен выезд к вам."
        />
        <meta
          property="og:description"
          content="Купить / Продать криптовалюту  за наличные. Без комиссий, выгодный курс! Комфортабельный безопасный офис, возможен выезд к вам."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta itemProp="image" content="/images/logo.png" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    </div>
  );
};

Home.PageLayout = AdminLayout;

export default Home;
