
import ModalComponent from "../modal/modal.component";
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { UserProps, StoryProps } from '../../../prisma/types';

type Props = {
  story: StoryProps
};

const Story = ({ story }: Props) => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps)

  const { t } = useTranslation();
  const { id, title, content, link, permalink, createdAt, user, comments, tags, category } = story;
  const storyVotes: any = { storyVotes: []};
  const vote = () => {

  }

  return (
    <>
      <div className="news-summary">
        <div className="news-body">
          <ul className="news-shakeit">
            <li className="mnm-published"><div>{storyVotes?.storyVotes.length} {t`votes`}</div></li>
            <li className="shakeit"><a href="/" onClick={vote} title="Vote it!">{t`vote`}</a></li>
          </ul>
          <h3 id="title691">
          <Link href={`/story/${id}`}>{title}</Link>
          </h3>
          <div className="news-submitted">
            <a href={`${link}`}><strong>{link}</strong></a><br />
            {t`sent_by`}<strong>{user?.name}</strong> {t`published_at`} {createdAt}
          </div>
          <div className="news-body-text">
            {content}
          </div>
          <div className="news-details">
            <span className="tool">{comments?.length} comments</span>
            <span className="tool">tags: {tags}</span>
            <span className="tool">category: {category}</span>
          </div>
        </div>
      </div>
      { user?.id === currentUser?.id && (
              <div className="edit-story">
                  <Link href={`/story/edit/${id}`}>Edit</Link>
              </div>
          )
      }  
      { storyVotes.error?.storyId === id && <ModalComponent message={storyVotes.error.message} /> }
    </>
  );
};

export default Story;