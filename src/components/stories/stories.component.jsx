import StoryComponent from '../story/story.component';
import { useSelector, useDispatch } from 'react-redux'; 
import { Fragment, useEffect, useCallback } from 'react';
import { selectSearchTerm, selectStories } from '../../store/story/story.selector';
import { selectStoriesAsync } from '../../store/story/story.actions';

import './stories.styles.scss';

const StoriesComponent = ({ categories }) => {
  const stories = useSelector(selectStories);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(selectStoriesAsync());
  }, []);

  useCallback(() => {
    console.log("Changed List: ", stories)
  }, [stories]);
  return (
    <>
      <h2>azken albisteak</h2>
      {stories.map((story) => (
        <StoryComponent key={story.id} story={story} />
      ))}
    </>
  );
};

export default StoriesComponent;
