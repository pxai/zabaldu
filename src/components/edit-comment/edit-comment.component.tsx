import { useState, useEffect, useContext, ChangeEvent } from "react";
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import { UserProps, CommentProps } from '../../../prisma/types';
import { useSession } from 'next-auth/react';
import axios from "axios";

type Props = {
    comment: CommentProps;
    saveComment: Function;
}
const EditCommentComponent = ({comment, saveComment}: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState(comment.content);
    const { data: session, status } = useSession();
    const user = session?.user as UserProps;
    const [submitError, setSubmitError] = useState<string>('');
    const commentError = '';

    const submitComment = async () => {
       console.log("Updated comment: ", {...comment})

       try {
           const response = await axios.put(`/api/comment/${comment.id}`, {content: text})
           setSubmitError('')
           saveComment(response.data.content);
           console.log("Response after update: ", response)
           //setCurrentVotes(currentVotes + 1);
         } catch (error) {
           //setStoryVoteResult(`${(error as AxiosError).message}`)
           console.log('Error on update ', error);
         }
    };

    const updateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    };
    
    return (
        <div className="edit-component">
            <div>
                <textarea className='form-input' onChange={updateText} cols={30} rows={10} value={text}/>
                <div><button onClick={submitComment}>Aldadu iruzkiña</button></div>
            </div>
            { submitError && <ModalComponent message={submitError} /> }
        </div>
    );
};

export default EditCommentComponent;