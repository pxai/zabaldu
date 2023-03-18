import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import StoryComponent from '../../components/story/story.component';
import CommentsComponent from '../../components/comments/comments.component';

export default function Home({story}) {
  return (
    <Layout>
      <main className="main">
        <StoryComponent story={story} />
        <CommentsComponent comments={story.comments} pages={story.commentPages}/>

      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } } ],
    fallback: 'blocking', // true: returns null until it gets // blocking : blocks // false: 404
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params;
  console.log('App getting: ', id)
  const {data } = await axios.get(`${process.env.API_URL}/api/story/${id}`)
  console.log('App: ', data)
  return {
    props: { 
      story: data,
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};