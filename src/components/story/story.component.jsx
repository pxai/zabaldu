
import ModalComponent from "../modal/modal.component";
import { useTranslation } from 'next-i18next'

import Link from 'next/link';

const Story = ({ story }) => {
  const { t } = useTranslation();
  const { id, title, text, link, submitted, when, comments, tags, category } = story;
  const storyVotes = { storyVotes: []};
  const { currentUser } = {}

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
            {t`sent_by`}<strong>{submitted.user}</strong> {t`published_at`} {when}
          </div>
          <div className="news-body-text">
            {text}
          </div>
          <div className="news-details">
            <span className="tool">{comments.length} comments</span>
            <span className="tool">tags: {tags.join(',')}</span>
            <span className="tool">category: {category}</span>
          </div>
        </div>
      </div>
      { submitted?.user_id === currentUser?.uid && (
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
