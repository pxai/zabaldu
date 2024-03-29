import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react';
import ModalComponent from "../modal/modal.component";
import EditCommentComponent from "../edit-comment/edit-comment.component";
import { UserProps, CommentProps } from '../../../prisma/types';

const CommentComponent = ({comment, number}: any) => {
    const { t } = useTranslation();
    const { data: session, status } = useSession();
    const user = session?.user as UserProps;
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [currentContent, setCurrentContent] = useState<string>(comment.content)
    const {id, content, ownerId, createdAt } = comment;
    const [votes, setVotes] = useState<number>();

    const voteUp = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        vote(1);
    }

    const voteDown = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        vote(-1);
    }

    const saveComment = (updatedContent: string) => {
        setEdit(!edit);
        setCurrentContent(updatedContent);
    }

    const vote = async (value: number) => {
        console.log("Component > About to vote: ", comment.id, value) //, submitted: userData })
        try {
          const response = await axios.post(`/api/comment/${comment.id}/vote`, {value})
          setVotes(response.data.result)
          //setCurrentVotes(currentVotes + 1);
        } catch (error) {
          console.log('Error on submit ', error);
        }
    }

    const deleteComment = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            if (!confirm("Seguru al zaude")) return;
            const response = await axios.delete(`/api/comment/${comment.id}`)
            setDeleted(true)
          } catch (error) {
            //setStoryVoteResult(`${(error as AxiosError).message}`)
            console.log('Error on delete ', error);
          }
    }

    const updateComment = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setEdit(true)
    }

    const showVotes = () => {
        if (!user) return;
        if (votes) return <span>Botoak {votes} | </span>;

        return (
            <><a href="" onClick={voteUp}> + </a> | <a href="" onClick={voteDown}> - </a></>
        )
    }

    if (deleted) return;

    return edit 
                ? (<li><EditCommentComponent comment={comment} saveComment={saveComment}/></li>)
                :
                (
                    <li>
                        <div className="comment-body" id={`wholecomment${id}`}>
                            <strong>#{number}</strong>
                            {currentContent}
                        </div>
                        <div className="comment-info"> 
                            {
                                showVotes() 
                            } 
                            Bidaltzailea <Link href={`/user/1`}>{comment?.owner.name}</Link> Noiz: {createdAt}
                        </div>
                        { ownerId === user?.id && (
                                <div>
                                    <a href="javacript: void(0)" onClick={updateComment}>Aldatu</a> | 
                                    <a href="javacript: void(0)" onClick={deleteComment}>Ezabatu</a>
                                </div>
                            )
                        }           
                        { /*commentVote.error?.commentId === id && <ModalComponent message={commentVote.error.message} />  */}
                    </li>
                )
}

export default CommentComponent;