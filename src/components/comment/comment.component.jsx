import { useDispatch } from "react-redux";
import { addCommentVoteAsync } from '../../store/comment_vote/comment_vote.actions'; 

const CommentComponent = ({comment, number}) => {
    const dispatch = useDispatch();
    const {id, text, submitted, when } = comment;
    const voteUp = (event) => {
        event.preventDefault();
        vote(1);
    }

    const voteDown = (event) => {
        event.preventDefault();
        vote(-1);
    }

    const vote = (vote) => {
        dispatch(addCommentVoteAsync({vote, commentId: id}))
    }

    return (
        <li>
            <div className="comment-body" id={`wholecomment${id}`}>
                <strong>#{number}</strong>
                {text}
            </div>
            <div className="comment-info">  
                <a href="" onClick={voteUp}> + </a> | <a href="" onClick={voteDown}> - </a>
                <a href="./user.php?login=iturri">{submitted.user}</a> (e)k bidali du {when}
                <img src="www.gravatar.com/avatar.php?gravatar_id=78afc7a929ff8c5298b35c125a8a1eda&amp;rating=PG&amp;size=20&amp;default=http%3A%2F%2Fwww.zabaldu.com%2Fimg%2Fcommon%2Fno-gravatar-2-20.jpg" width="20" height="20" alt="iturri" title="gravatar.com" />
            </div>
        </li>
    )
}

export default CommentComponent;