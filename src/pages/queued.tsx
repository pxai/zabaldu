import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';
import StoriesComponent from '../components/stories/stories.component';

export default function Home({stories}: any) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
      <StoriesComponent stories={stories} status="published" />
      </main>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  //const stories = [];
  const stories = await prisma.story.findMany({
    where: {
      status: {
        equals: 'QUEUED',
      },
    },
    include: {
      comments: true, 
      storyVotes: true
    },
  }) 
  //const {data:{stories}} = await axios.get(`${process.env.API_URL}/api/story`)
  console.log('App: ', stories)
  return {
    props: { 
      stories: JSON.parse(JSON.stringify(stories)),
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};