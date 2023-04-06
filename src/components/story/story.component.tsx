
import ModalComponent from "../modal/modal.component";
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { UserProps, StoryProps } from '../../../prisma/types';
import { useRouter } from "next/router";

type Props = {
  story: StoryProps
};

const Story = ({ story }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentVotes, setCurrentVotes] = useState<number>(story.storyVotes?.length || 0)
  const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps)
  const userName = currentUser?.name ? currentUser?.name.split(" ")[0] : 'user';
  const [storyVoteResult, setStoryVoteResult] = useState<string>('');
  const { t } = useTranslation();

  const { id, title, content, link, permalink, createdAt, user, comments, tags, category } = story;

  const vote = async () => {
      console.log("Component > About to vote: ", story.id) //, submitted: userData })
      try {
        const response = await axios.post(`/api/story/${story.id}/vote`)
        setCurrentVotes(currentVotes + 1);
      } catch (error) {
        setStoryVoteResult(`${(error as AxiosError).message}`)
        console.log('Error on submit ', error);
      }
  }

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const msg = t`are_you_sure`
      if (confirm(msg)) {
        const response = await axios.delete(`/api/story/${story.id}`)
        router.push('/')
      }
    } catch (error) {
      //setStoryVoteResult(`${(error as AxiosError).message}`)
      console.log('Error on delete ', error);
    }
  }

  return (
    <>
      <div className="news-summary">
        <div className="news-body">
          <ul className="news-shakeit">
            <li className="mnm-published"><span>{currentVotes} {t`votes`}</span></li>
            <li className="shakeit"><span onClick={vote} title="Vote it!">{t`vote`}</span></li>
          </ul>
          <h3 id="title691">
            <Link href={`/story/${id}`}>{title}</Link>
          </h3>
          <div className="news-submitted">
            <div><Link href={`${link}`}><strong>{link}</strong></Link></div>
            <div>{t`sent_by`} <strong>{userName}</strong> {t`published_at`} <span>{`${createdAt}`}</span></div>
          </div>
          <div className="news-body-text">
            {content}
          </div>
          <div className="news-details">
            <span className="tool">{comments?.length} comments</span>
            <span className="tool">tags: {tags}</span>
            <span className="tool">category: {category?.name}</span>
          </div>
        </div>
      </div>
      { user?.id === currentUser?.id && (
            <div>
              <div className="edit-story">
                  <Link href={`/story/edit/${id}`}>{t`edit`}</Link>
              </div>
              <div className="edit-story">
                  <a onClick={handleDelete} >{t`remove`}</a>
              </div>
            </div>

          )
      }  
      { storyVoteResult != '' && <ModalComponent message={storyVoteResult} /> }
    </>
  );
};

export default Story;
