import StoryComponent from '../story/story.component';
import { useSelector, useDispatch } from 'react-redux'; 
import { Fragment, useState, useEffect, useCallback } from 'react';
import { selectSearchTerm, selectStories } from '../../store/story/story.selector';
import { selectStoriesAsync } from '../../store/story/story.actions';
import PaginatorComponent from '../paginator/paginator.component';

import './stories.styles.scss';

const StoriesComponent = ({ categories }) => {
  const [page, setPage] = useState(0);
  const {stories, storiesPages} = useSelector(selectStories);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  useEffect( () => {
    console.log("Changed page: ", page)
    dispatch(selectStoriesAsync(page, searchTerm));
  }, [page, searchTerm]);

  useCallback(() => {
  }, [stories]);
  return (
    <>
      <h2>azken albisteak</h2>
      {stories.map((story) => (
        <StoryComponent key={story.id} story={story} />
      ))}
      <PaginatorComponent pages={storiesPages} setPage={setPage} />
    </>
  );
};

export default StoriesComponent;
