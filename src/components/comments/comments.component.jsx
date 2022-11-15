import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { selectCommentsAsync } from '../../store/comment/comment.actions';
import { selectComments } from '../../store/comment/comment.selector';
import CommentComponent from "../comment/comment.component";
import PaginatorComponent from "../paginator/paginator.component";

const CommentsComponent = ({storyId, pages}) => {
    const [page, setPage] = useState(0);
    const comments = useSelector(selectComments(storyId, page));
    const dispatch = useDispatch();
  
    useEffect( () => {
      dispatch(selectCommentsAsync(storyId, page));
    }, [page]);

    return (
        <div id="comments">
            <h2>Iruzkinak</h2>
            <ol id="comments-list">
                {comments.map( (comment, i) => {
                    return <CommentComponent comment={comment} key={comment.id} number={(page * 10 ) + i+1} />
                })}
            </ol>
                <PaginatorComponent pages={pages} setPage={setPage} />
        </div>
    )
}

export default CommentsComponent;