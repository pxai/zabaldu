import { COMMENT_VOTES_ACTION_TYPES } from './comment_vote.types';


export const initialCommentVoteState = {
    isLoading: false,
    error: null,
    commentVotes: []
}

export const commentVoteReducer = (state = initialCommentVoteState, action) => {
    const {type, payload} = action;
    let changedComments = null;
    switch (type) {
        case COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                commentVotes: [...state.commentVotes, payload],
            };
        case COMMENT_VOTES_ACTION_TYPES.ADD_COMMENT_VOTE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
}

