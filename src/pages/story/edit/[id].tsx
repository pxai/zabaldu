import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next'
import Layout from '../../../components/layout';
import SendForm from '../../../components/send-form/send-form.component';
import { StoryProps } from 'prisma/types';
import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';

type Props = {
  story: StoryProps
}

export default function EditStory({story}: Props) {
  const router = useRouter();
  const { t } = useTranslation()

  const handleStoryUpdate = async (updatedStory: StoryProps) => {
    const response = await axios.put(`/api/story/${story.id}`, updatedStory)
    router.push(`/story/${updatedStory.id}`)
  }

  return (
    <Layout>
      <main className="main">
        <SendForm formValues={story} sendAction={handleStoryUpdate} />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const { id }: any = params;

  const result =  await prisma.story.findUnique({
    where: { id },
  });
  console.log("Check out this result: ", JSON.stringify(result));

  return {
    props: { 
      story: JSON.parse(JSON.stringify(result)),
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};