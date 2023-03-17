import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../../contexts/app.context';
import { addCommentAsync } from '../../store/comment/comment.actions';
import { selectCommentError } from '../../store/comment/comment.selector';
import { useTranslation } from 'react-i18next';
import ModalComponent from "../modal/modal.component";
import Button from '../button/button';
import './add-comment.styles.scss';

const AddCommentComponent = ({storyId}) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const commentError = useSelector(selectCommentError);
    const dispatch = useDispatch();
    const { currentUser } = useContext(UserContext);
    const userData = { user: currentUser.displayName, user_id: currentUser.uid};

   useEffect(() => {
        if (commentError.createdComment !== null && !commentError.error)
            setText('')
    }, [commentError])
    
    const submitError = () =>  !commentError.isLoading && commentError.error;

    const submitComment = () => {
        dispatch(addCommentAsync({storyId, text, submitted: userData}));
    };

    const updateText = (event) => {
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