import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../../../components/layout';
import StoriesComponent from '../../../components/stories/stories.component';

export default function Home({stories}: any) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
        <StoriesComponent stories={stories} />
      </main>
    </Layout>
  )
}


const STORY_PAGINATION = process.env.STORY_PAGINATION || 10;

export async function getStaticPaths({locales}) {
  return {
    paths: [{ params: { page: '0' }, locale: 'eu' }, { params: { page: '1' }, locale: 'eu' }, { params: { page: '2' }, locale: 'eu' }],
    fallback: 'blocking', // true: returns null until it gets // blocking : blocks // false: 404
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  //const stories = [];
  const page: number = params?.page && Number.isInteger(+params?.page) ? +params.page : 0
  const stories = await prisma.story.findMany({
    where: {
      status: {
        equals: 'PUBLISHED',
      },
    },
    include: {
      comments: true, 
      storyVotes: true
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    skip: page * 10,
    take: +STORY_PAGINATION,
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