import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import EditCommentComponent from "../edit-comment/edit-comment.component";

const CommentComponent = ({comment, number}) => {
    const { t } = useTranslation();
    const [edit, setEdit] = useState(false)
    const {id, content, submitted, createdAt } = comment;

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

    }

    const deleteComment = (e) => {
        e.preventDefault();
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
                            {content}
                        </div>
                        <div className="comment-info">  
                            <a href="" onClick={voteUp}> + </a> | <a href="" onClick={voteDown}> - </a>
                            {t`sent_by`} <Link href={`/user/1`}>{comment?.owner}</Link> {t`at`} {createdAt}
                        </div>
                        { /*submitted?.user_id === currentUser?.uid && (
                                <div>
                                    <a href="javacript: void(0)" onClick={updateComment}>{t`edit`}</a> | 
                                    <a href="javacript: void(0)" onClick={deleteComment}>{t`remove`}</a>
                                </div>
                            )*/
                        }           
                        { /*commentVote.error?.commentId === id && <ModalComponent message={commentVote.error.message} />  */}
                    </li>
                )
}

export default CommentComponent;