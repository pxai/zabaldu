import { COMMENTS_ACTION_TYPES } from './comment.types';
import axios from 'axios';
import { createAction } from '../../utils/reducer/reducer.utils';

export const selectCommentsStart = () => {
    return createAction(COMMENTS_ACTION_TYPES.SELECT_COMMENTS_START);
};

export const selectCommentsSuccess = (comments) => {
    return createAction(COMMENTS_ACTION_TYPES.SELECT_COMMENTS_SUCCESS, comments);
};

export const selectCommentsError = (error) => {
    return createAction(COMMENTS_ACTION_TYPES.SELECT_COMMENTS_ERROR, error);
};

export const addCommentStart = () => {
    return createAction(COMMENTS_ACTION_TYPES.ADD_COMMENT_START);
};

export const addCommentSuccess = (comment) => {
    return createAction(COMMENTS_ACTION_TYPES.ADD_COMMENT_SUCCESS, comment);
};

export const addCommentError = (error) => {
    return createAction(COMMENTS_ACTION_TYPES.ADD_COMMENT_ERROR, error);
};

export const removeCommentStart = () => {
    return createAction(COMMENTS_ACTION_TYPES.REMOVE_COMMENT_START);
};

export const removeCommentSuccess = (id) => {
    return createAction(COMMENTS_ACTION_TYPES.REMOVE_COMMENT_SUCCESS, id);
};

export const removeCommentError = (error) => {
    return createAction(COMMENTS_ACTION_TYPES.REMOVE_COMMENT_ERROR, error);
};

export const updateCommentStart = () => {
    return createAction(COMMENTS_ACTION_TYPES.UPDATE_COMMENT_START);
};

export const updateCommentSuccess = (comment) => {
    return createAction(COMMENTS_ACTION_TYPES.UPDATE_COMMENT_SUCCESS, comment);
};

export const updateCommentError = (error) => {
    return createAction(COMMENTS_ACTION_TYPES.UPDATE_COMMENT_ERROR, error);
};

export const searchComment = (name) => {
    return createAction(COMMENTS_ACTION_TYPES.SEARCH_COMMENT, name);
};

export const selectCommentsAsync =  (storyId, page = 0) => async (dispatch) => {
    dispatch(selectCommentsStart());
    try {
        const response = await axios.get(`/api/comment/${storyId}/${page}`);
        dispatch(selectCommentsSuccess(response.data));
    } catch (error) {
        dispatch(selectCommentsError(error))
    }
};

export const addCommentAsync = (storyId, text) => async (dispatch) => {
    dispatch(addCommentStart());
    try {
        const response = await axios.post('/api/comment', {storyId, text})
        dispatch(addCommentSuccess(response.data));
    } catch (error) {
        dispatch(addCommentError({error: error.message}));
    }
}

export const removeCommentAsync = (id) => async (dispatch) => {
    dispatch(removeCommentStart());
    try {
        console.log("About to send ID: ", id)
        const response = await axios.delete(`/api/comment/${id}`);
        dispatch(removeCommentSuccess(response.data))
    } catch (error) {
        dispatch(removeCommentError(error));
    }
} 

export const updateCommentAsync = (comment) => async (dispatch) => {
    dispatch(updateCommentStart(comment));
    try {
        const response = await axios.put('/api/comments', {...comment});
        dispatch(updateCommentSuccess(response.data));
    } catch (error) {
        dispatch(updateCommentError(error));
    }
}