import axios from 'axios';
//simport styles from '@/styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/layout';
import StoryComponent from '../../components/story/story.component';
import CommentsComponent from '../../components/comments/comments.component';
import AddCommentComponent from '../../components/add-comment/add-comment.component';
import { UserProps, StoryProps } from '../../../prisma/types';

type Props = {
  story: StoryProps
};

const StoryPage = ({ story }: Props) => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps)

  return (
    <Layout>
      <main className="main">
        <StoryComponent story={story} />
        <CommentsComponent comments={story.comments} pages={story.comments?.length}/>
        { currentUser && <AddCommentComponent storyId={story.id}/>}
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
  const { id }: any = params;
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

export default StoryPage;