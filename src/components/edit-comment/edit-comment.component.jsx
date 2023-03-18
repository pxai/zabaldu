import { useState, useEffect, useContext } from "react";
import { useTranslation } from 'next-i18next'
import ModalComponent from "../modal/modal.component";

const EditCommentComponent = ({comment}) => {
    const { t } = useTranslation();
    const [text, setText] = useState(comment.text);
    const { currentUser } = useContext(UserContext);
    const userData = { user: currentUser.displayName, user_id: currentUser.uid};

    useEffect(() => {
        console.log("About to update comment: ", comment, commentError, comment.text)
        /*if (commentError.createdComment !== null && commentError.error != null) {
            setText('')
        }*/
    }, [commentError])
    
    
    const submitError = () =>  !commentError.isLoading && commentError.error;

    const submitComment = () => {
       console.log("Updated comment: ", {...comment, submitted: userData})
    };

    const updateText = (event) => {
        setText(event.target.value)
        comment.text = text;
    };
    
    return (
        <div className="edit-component">
            <div>
                <textarea className='form-input' onChange={updateText} cols="30" rows="10" value={text}/>
                <div><button onClick={submitComment}>{t`update_comment`}</button></div>
            </div>
            { submitError() && <ModalComponent message={commentError.error} /> }
        </div>
    );
};

export default EditCommentComponent;