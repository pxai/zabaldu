import { COMMENTS_ACTION_TYPES } from './comment.types';

const updateCommentFromComments = (comments, commentToUpdate) => {
    const filteredComments = comments.filter( comment => comment.id !== commentToUpdate.id);

    return [...filteredComments, commentToUpdate];
}

export const initialCommentState = {
    isLoading: false,
    error: null,
    comments: [],
    searchTerm: '',
    page: 0,
    createdComment: null,
}

export const commentReducer = (state = initialCommentState, action) => {
    const {type, payload} = action;

    let changedComments = null;
    switch (type) {
        case COMMENTS_ACTION_TYPES.SELECT_COMMENTS_START:
            return {
                ...state,
                isLoading: true,
                createdComment: null,
            };
        case COMMENTS_ACTION_TYPES.SELECT_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: payload,
                isLoading: false,
                error: null
            };
        case COMMENTS_ACTION_TYPES.SELECT_COMMENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case COMMENTS_ACTION_TYPES.ADD_COMMENT_START:
            return {
                ...state,
                isLoading: true,
                error: null,
                createdComment: null,
            };
        case COMMENTS_ACTION_TYPES.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                createdComment: payload,
                comments: [...state.comments, payload],
            };
        case COMMENTS_ACTION_TYPES.ADD_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
            };
        case COMMENTS_ACTION_TYPES.UPDATE_COMMENT_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case COMMENTS_ACTION_TYPES.UPDATE_COMMENT_SUCCESS:
            changedComments = updateCommentFromComments(state.comments, payload);
            return {
                ...state,
                comments: changedComments,
                isLoading: false,
            };
        case COMMENTS_ACTION_TYPES.UPDATE_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case COMMENTS_ACTION_TYPES.REMOVE_COMMENT_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case COMMENTS_ACTION_TYPES.REMOVE_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: state.comments.filter(comment => comment.id !== payload.id)
            };
        case COMMENTS_ACTION_TYPES.REMOVE_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case COMMENTS_ACTION_TYPES.SEARCH_COMMENT:
            return {
                ...state,
                searchTerm: payload,
            };
        default:
            return state;
    }
}

