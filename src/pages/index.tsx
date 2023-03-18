import axios from 'axios';
import styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';
import { useEffect } from 'react';

export default function Home({stories}) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className={styles.main}>
      {t`site.name`}
      </main>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  //const stories = [];
  console.log("Dal: ", process.env.API_URL)
  const {data} = await axios.get(`${process.env.API_URL}/api/story`)
  console.log('App: ', data)
  return {
    props: { 
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};