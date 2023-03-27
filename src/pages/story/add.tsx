import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../../components/layout';
import SendForm from '../../components/send-form/send-form.component';

export default function AddStory({}) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
      <SendForm  />
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