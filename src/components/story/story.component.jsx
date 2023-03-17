import { useContext } from 'react';
import { UserContext } from '../../contexts/app.context';
import ModalComponent from "../modal/modal.component";
import { useDispatch, useSelector } from "react-redux";
import { addStoryVoteAsync } from '../../store/story_vote/story_vote.actions'; 
import { selectStoryVotes } from '../../store/story_vote/story_vote.selector';
import { useTranslation } from 'react-i18next';
import './story.styles.scss';
import { Link } from 'react-router-dom';

const Story = ({ story }) => {
  const { t } = useTranslation();
  const { id, title, text, link, submitted, when, comments, tags, category } = story;
  const dispatch = useDispatch();
  const storyVotes = useSelector(selectStoryVotes(id))
  const { currentUser } = useContext(UserContext);

  const vote = (event) => {
    event.preventDefault();
    dispatch(addStoryVoteAsync({storyId: id}))
  }

  return (
    <>
      <div className="news-summary">
        <div className="news-body">
          <ul className="news-shakeit">
            <li className="mnm-published"><div>{storyVotes.storyVotes.length} {t`votes`}</div></li>
            <li className="shakeit"><a href="/" onClick={vote} title="Vote it!">{t`vote`}</a></li>
          </ul>
          <h3 id="title691">
          <Link to={`/story/${id}`}>{title}</Link>
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
                  <Link to={`/story/edit/${id}`}>Edit</Link>
              </div>
          )
      }  
      { storyVotes.error?.storyId === id && <ModalComponent message={storyVotes.error.message} /> }
    </>
  );
};

export default Story;
