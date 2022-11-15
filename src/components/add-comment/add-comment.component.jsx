import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync } from '../../store/comment/comment.actions';
import { selectCommentError } from '../../store/comment/comment.selector';
import ModalComponent from "../modal/modal.component";

const AddCommentComponent = ({storyId}) => {
    const [text, setText] = useState('');
    const commentError = useSelector(selectCommentError);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log("CHANGED: ", commentError)
        if (commentError.createdComment !== null && !commentError.error)
            setText('')
      }, [commentError])
      
    
    const submitError = () =>  !commentError.isLoading && commentError.error;

    const submitComment = () => {
        dispatch(addCommentAsync(storyId, text));
    };

    const updateText = (event) => {
        setText(event.target.value)
    };
    
    return (
        <div>
            <div>
                <textarea className='form-input' onChange={updateText} cols="30" rows="10" value={text}/>
                <div>
                    <button onClick={submitComment}>Add comment</button>
                </div>
            </div>
            { submitError() && <ModalComponent message={commentError.error} /> }
        </div>
    );
};

export default AddCommentComponent;