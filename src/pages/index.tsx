import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';
import StoriesComponent from '../components/stories/stories.component';

export default function Home({stories}) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
      {t`site.name`}
      <StoriesComponent stories={stories} status="published" />
      </main>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  //const stories = [];
  const {data:{stories}} = await axios.get(`${process.env.API_URL}/api/story`)
  console.log('App: ', stories)
  return {
    props: { 
      stories,
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};