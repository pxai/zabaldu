import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../../components/layout';
import prisma from '../../lib/prisma';
import SendForm from '../../components/send-form/send-form.component';
import { CategoryProps, StoryProps } from 'prisma/types';
import { useRouter } from 'next/router';

type Props = {
  categories: CategoryProps
}

export default function AddStory({categories}: Props) {
  const router = useRouter();
  const { t } = useTranslation()

  const handleStoryCreate = async (story: StoryProps) => {
    const response = await axios.post(`/api/story`, story)
    router.push(`/`)
  }

  return (
    <Layout>
      <main className="main">
      <SendForm sendAction={handleStoryCreate} categories={categories} />
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const categories = await prisma.category.findMany();
  return {
    props: { 
      categories,
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};