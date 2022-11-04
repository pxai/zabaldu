import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentAsync } from '../../store/comment/comment.actions';

const AddCommentComponent = ({storyId}) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const submitComment = () => {
        dispatch(addCommentAsync(storyId, text));
        setText('');
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
        </div>
    );
};

export default AddCommentComponent;