import axios from 'axios';
import prisma from '../../lib/prisma';
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
  console.log("Selected story: ", story)
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
    paths: [], //[{ params: { id: 'clfprk13t0000sbngdtbtmqj0' } } ],
    fallback: 'blocking', // true: returns null until it gets // blocking : blocks // false: 404
  }
}


export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id }: any = params;

  const result =  await prisma.story.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          owner: {
            select: { name: true }
          }
        }
      },
      category: {
        select: { name: true }
      }
    },
  });
console.log("Check out this result: ", JSON.stringify(result));

  return {
    props: { 
      story: JSON.parse(JSON.stringify(result)),
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};

export default StoryPage;