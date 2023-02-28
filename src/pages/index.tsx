import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation()
  return (
    <Layout>
      <main className={styles.main}>
      {t`site.name`}
      </main>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { 
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};