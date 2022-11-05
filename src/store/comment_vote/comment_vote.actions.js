

import { COMMENT_VOTES_ACTION_TYPES } from './comment_vote.types';
import axios from 'axios';
import { createAction } from '../../utils/reducer/reducer.utils';

export const addCommentVoteStart = () => {
    return createAction(COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_START);
};

export const addCommentVoteSuccess = (commentVote) => {
    return createAction(COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_SUCCESS, commentVote);
};

export const addCommentVoteError = (error) => {
    return createAction(COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_ERROR, error);
};

export const addCommentVoteAsync = (commentVote) => async (dispatch) => {
    dispatch(addCommentVoteStart());
    try {
        console.log(commentVote)
        const response = await axios.post(`/api/comment/${commentVote.commentId}/vote`, {...commentVote})
        dispatch(addCommentVoteSuccess(response.data));
    } catch (error) {
        dispatch(addCommentVoteError(error));
    }
}
