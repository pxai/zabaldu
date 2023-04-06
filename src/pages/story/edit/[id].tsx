import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../../../components/layout';
import SendForm from '../../../components/send-form/send-form.component';
import { CategoryProps, StoryProps } from 'prisma/types';
import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';

type Props = {
  story: StoryProps,
  categories: CategoryProps[]
}

export default function EditStory({story, categories}: Props) {
  const router = useRouter();
  const { t } = useTranslation()

  const handleStoryUpdate = async (updatedStory: StoryProps) => {
    const response = await axios.put(`/api/story/${story.id}`, updatedStory)
    router.push(`/story/${updatedStory.id}`)
  }

  return (
    <Layout>
      <main className="main">
        <SendForm formValues={story} categories={categories} sendAction={handleStoryUpdate} />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const { id }: any = params;
  const categories = await prisma.category.findMany();

  const result =  await prisma.story.findUnique({
    where: { id },
  });
  console.log("Check out this result: ", JSON.stringify(result));

  return {
    props: { 
      categories,
      story: JSON.parse(JSON.stringify(result)),
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};