import { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";
import Button from '../button/button';
import { useSession } from 'next-auth/react';
import { UserProps, CommentProps } from '../../../prisma/types';

type Props = {
    storyId: number
  };

const AddCommentComponent = ({storyId}: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const commentError = {createdComment: null, error: null, isLoading: false, };
    const { data: session, status } = useSession();
    const [currentUser, setCurrentUser] = useState<UserProps>(session?.user as UserProps);
    const userData = { user: currentUser.name, user_id: currentUser.id};

   useEffect(() => {
        if (commentError?.createdComment !== null && !commentError?.error)
            setText('')
    }, [commentError])
    
    const submitError = () =>  !commentError?.isLoading && commentError?.error;

    const submitComment = () => {
        //dispatch(addCommentAsync({storyId, text, submitted: userData}));
    };

    const updateText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    };
    
    return (
        <div className="add-comment">
            <div>
                <textarea className="form-input" onChange={updateText} cols="30" rows="10" value={text}/>
                <Button onClick={submitComment}>{t`add_comment`}</Button>
            </div>
            { submitError() && <ModalComponent message={commentError.error} /> }
        </div>
    );
};

export default AddCommentComponent;