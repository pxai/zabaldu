import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import EditCommentComponent from "../edit-comment/edit-comment.component";

const CommentComponent = ({comment, number}: any) => {
    const { t } = useTranslation();
    const [edit, setEdit] = useState(false)
    const {id, content, submitted, createdAt, user } = comment;

    useEffect(() => {
        console.log("updateCommentAsync> dale:", edit, {...comment})
        if (edit) setEdit(false)
        console.log("updateCommentAsync> dale now:", edit, {...comment})
      }, [comment])

    const voteUp = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        vote(1);
    }

    const voteDown = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        vote(-1);
    }

    const vote = async (value: number) => {
        console.log("Component > About to vote: ", comment.id, value) //, submitted: userData })
        try {
          const response = await axios.post(`/api/comment/${comment.id}/vote`, {value})
          //setCurrentVotes(currentVotes + 1);
        } catch (error) {
          //setStoryVoteResult(`${(error as AxiosError).message}`)
          console.log('Error on submit ', error);
        }
    }

    // const deleteComment = (e) => {
    //     e.preventDefault();
    // }

    // const updateComment = (e) => {
    //     e.preventDefault();
    //     setEdit(true)
    // }

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
                            {t`sent_by`} <Link href={`/user/1`}>{comment?.owner.name}</Link> {t`at`} {createdAt}
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