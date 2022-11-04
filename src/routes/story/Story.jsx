import { useParams } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import StoryComponent from '../../components/story/story.component';
import { selectStory } from '../../store/story/story.selector';
import CommentsComponent from '../../components/comments/comments.component';
import AddCommentComponent  from '../../components/add-comment/add-comment.component';

const Story = () => {
  const { id } = useParams(); 
  const story = useSelector(selectStory(id));

  return (
    <div id="contents">
       <StoryComponent story={story} />
       <CommentsComponent storyId={story.id}/>
       <AddCommentComponent storyId={story.id}/>
    </div>
   
  )
};

export default Story;