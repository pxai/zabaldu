import { useDispatch, useSelector } from "react-redux";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/app.context';
import { Link } from 'react-router-dom';
import ModalComponent from "../modal/modal.component";
import { removeCommentAsync } from '../../store/comment/comment.actions';
import { addCommentVoteAsync } from '../../store/comment_vote/comment_vote.actions'; 
import { selectCommentVotes } from '../../store/comment_vote/comment_vote.selector';
import EditCommentComponent from "../edit-comment/edit-comment.component";

const CommentComponent = ({comment, number}) => {
    const [edit, setEdit] = useState(false)
    const {id, text, submitted, when, author } = comment;
    const { currentUser } = useContext(UserContext);
    const dispatch = useDispatch();
    const commentVote = useSelector(selectCommentVotes(id))

    useEffect(() => {
        console.log("CHANGED: ", comment)
      }, [comment])

    const voteUp = (event) => {
        event.preventDefault();
        vote(1);
    }

    const voteDown = (event) => {
        event.preventDefault();
        vote(-1);
    }

    const vote = (vote) => {
        dispatch(addCommentVoteAsync({vote, commentId: id}))
    }

    const deleteComment = (e) => {
        e.preventDefault();
            dispatch(removeCommentAsync(id));
    }

    const updateComment = (e) => {
        e.preventDefault();
        setEdit(true)
    }

    return edit 
                ? (
                    <li><EditCommentComponent comment={comment}/>
                    </li>
                )
                :
                (
                    <li>
                        <div className="comment-body" id={`wholecomment${id}`}>
                            <strong>#{number}</strong>
                            {text}
                        </div>
                        <div className="comment-info">  
                            <a href="" onClick={voteUp}> + </a> | <a href="" onClick={voteDown}> - </a>
                            <Link to={`/user/${submitted.user}`}>{submitted.user}</Link> (e)k bidali du {when}
                            <img src="www.gravatar.com/avatar.php?gravatar_id=78afc7a929ff8c5298b35c125a8a1eda&amp;rating=PG&amp;size=20&amp;default=http%3A%2F%2Fwww.zabaldu.com%2Fimg%2Fcommon%2Fno-gravatar-2-20.jpg" width="20" height="20" alt="iturri" title="gravatar.com" />
                        </div>
                        { submitted?.user_id === currentUser.uid && (
                                <div>
                                    <a href="javacript: void(0)" onClick={updateComment}>Aldatu</a> | 
                                    <a href="javacript: void(0)" onClick={deleteComment}>Ezabatu</a>
                                </div>
                            )
                        }           
                        { commentVote.error?.commentId === id && <ModalComponent message={commentVote.error.message} /> }
                    </li>
                )
}

export default CommentComponent;