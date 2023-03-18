import { useDispatch, useSelector } from "react-redux";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/app.context';
import { Link } from 'react-router-dom';
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import { removeCommentAsync } from '../../store/comment/comment.actions';
import { addCommentVoteAsync } from '../../store/comment_vote/comment_vote.actions'; 
import { selectCommentVotes } from '../../store/comment_vote/comment_vote.selector';
import EditCommentComponent from "../edit-comment/edit-comment.component";

const CommentComponent = ({comment, number}) => {
    const { t } = useTranslation();
    const [edit, setEdit] = useState(false)
    const {id, text, submitted, when } = comment;
    const { currentUser } = useContext(UserContext);
    const dispatch = useDispatch();
    const commentVote = useSelector(selectCommentVotes(id))

    useEffect(() => {
        console.log("updateCommentAsync> dale:", edit, {...comment})
        if (edit) setEdit(false)
        console.log("updateCommentAsync> dale now:", edit, {...comment})
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
                ? (<li><EditCommentComponent comment={comment}/></li>)
                :
                (
                    <li>
                        <div className="comment-body" id={`wholecomment${id}`}>
                            <strong>#{number}</strong>
                            {text}
                        </div>
                        <div className="comment-info">  
                            <a href="" onClick={voteUp}> + </a> | <a href="" onClick={voteDown}> - </a>
                            {t`sent_by`} <Link to={`/user/${submitted.user}`}>{submitted.user}</Link> {t`at`} {when}
                        </div>
                        { submitted?.user_id === currentUser?.uid && (
                                <div>
                                    <a href="javacript: void(0)" onClick={updateComment}>{t`edit`}</a> | 
                                    <a href="javacript: void(0)" onClick={deleteComment}>{t`remove`}</a>
                                </div>
                            )
                        }           
                        { commentVote.error?.commentId === id && <ModalComponent message={commentVote.error.message} /> }
                    </li>
                )
}

export default CommentComponent;