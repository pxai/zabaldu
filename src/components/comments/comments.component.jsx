import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { selectCommentsAsync } from '../../store/comment/comment.actions';
import { selectComments } from '../../store/comment/comment.selector';
import CommentComponent from "../comment/comment.component";

const CommentsComponent = ({storyId}) => {
    const comments = useSelector(selectComments(storyId));
    const dispatch = useDispatch();
  
    useEffect( () => {
      dispatch(selectCommentsAsync(storyId));
    }, []);

    return (
        <div id="comments">
            <h2>Iruzkinak</h2>
            <ol id="comments-list">
                {comments.map( (comment, i) => {
                    return <CommentComponent comment={comment} key={comment.id} number={i+1} />
                })}
            </ol>
        </div>
    )
}

export default CommentsComponent;