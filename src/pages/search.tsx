import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';
import StoriesComponent from '../components/stories/stories.component';

export default function Search({stories}: any) {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
        <StoriesComponent stories={stories} />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  console.log("These are params: ", query)
  //const stories = [];
  const searchTerm = query.term;
  const stories = await prisma.story.findMany({
    where: {
      OR: [
        { content : { contains: String(searchTerm) } },
        { title: { contains: String(searchTerm) } },
      ],
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
    skip: 0,
    take: 10,
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