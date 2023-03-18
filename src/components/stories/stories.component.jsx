import StoryComponent from '../story/story.component';
import { useState } from 'react';
import { useTranslation } from 'next-i18next'

const StoriesComponent = ({ stories, status }) => {
  const { t } = useTranslation();

  return (
    <div className="stories">
      <h2>{t`latest`}</h2>
      {stories.map(story => <StoryComponent key={story.id} story={story} />)}
    </div>
  );
};

export default StoriesComponent;
