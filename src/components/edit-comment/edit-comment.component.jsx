import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentAsync } from '../../store/comment/comment.actions';
import { selectCommentError } from '../../store/comment/comment.selector';
import ModalComponent from "../modal/modal.component";

const EditCommentComponent = ({comment}) => {
    const [text, setText] = useState(comment.text);
    const commentError = useSelector(selectCommentError);
    const dispatch = useDispatch();


    useEffect(() => {
        if (commentError.createdComment !== null && !commentError.error) {
            setText('')
        }
    }, [commentError])
    
    
    const submitError = () =>  !commentError.isLoading && commentError.error;

    const submitComment = () => {
       dispatch(updateCommentAsync(comment));
       console.log("Updated comment: ", comment)
    };

    const updateText = (event) => {
        setText(event.target.value)
        comment.text = text;
    };
    
    return (
        <div>
            <div>
                <textarea className='form-input' onChange={updateText} cols="30" rows="10" value={text}/>
                <div>
                    <button onClick={submitComment}>Update comment</button>
                </div>
            </div>
            { submitError() && <ModalComponent message={commentError.error} /> }
        </div>
    );
};

export default EditCommentComponent;