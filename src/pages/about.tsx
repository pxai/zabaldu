import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';

export default function About() {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
      Zabaldu.net
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