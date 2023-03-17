import StoryComponent from '../story/story.component';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { selectSearchTerm, selectStories } from '../../store/story/story.selector';
import { selectStoriesAsync } from '../../store/story/story.actions';
import PaginatorComponent from '../paginator/paginator.component';
import './stories.styles.scss';

const StoriesComponent = ({ status }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const {stories, storiesPages} = useSelector(selectStories);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(selectStoriesAsync(page, searchTerm, status));
  }, [page, searchTerm, status]);

  useCallback(() => {
  }, [stories]);
  return (
    <div className="stories">
      <h2>{t`latest`}</h2>
      {stories.map(story => <StoryComponent key={story.id} story={story} />)}
      <PaginatorComponent pages={storiesPages} setPage={setPage} />
    </div>
  );
};

export default StoriesComponent;
