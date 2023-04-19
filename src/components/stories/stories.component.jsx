import StoryComponent from '../story/story.component';
import { useTranslation } from 'next-i18next'

const StoriesComponent = ({ stories }) => {
  const { t } = useTranslation();

  return (
    <div className="stories">
      <h2>Azken Albsiteak</h2>
      {stories.map(story => <StoryComponent key={story.id} story={story} />)}
    </div>
  );
};

export default StoriesComponent;
