import { STORIES_ACTION_TYPES } from './story.types';
import axios from 'axios';
import { createAction } from '../../utils/reducer/reducer.utils';

export const selectStoriesStart = () => {
    return createAction(STORIES_ACTION_TYPES.SELECT_STORIES_START);
};

export const selectStoriesSuccess = (stories) => {
    return createAction(STORIES_ACTION_TYPES.SELECT_STORIES_SUCCESS, stories);
};

export const selectStoriesError = (error) => {
    return createAction(STORIES_ACTION_TYPES.SELECT_STORIES_ERROR, error);
};

export const addStoryStart = () => {
    return createAction(STORIES_ACTION_TYPES.ADD_STORY_START);
};

export const addStorySuccess = (story) => {
    return createAction(STORIES_ACTION_TYPES.ADD_STORY_SUCCESS, story);
};

export const addStoryError = (error) => {
    return createAction(STORIES_ACTION_TYPES.ADD_STORY_ERROR, error);
};

export const removeStoryStart = (id) => {
    return createAction(STORIES_ACTION_TYPES.REMOVE_STORY_START, id);
};

export const removeStorySuccess = () => {
    return createAction(STORIES_ACTION_TYPES.REMOVE_STORY_SUCCESS);
};

export const removeStoryError = (error) => {
    return createAction(STORIES_ACTION_TYPES.REMOVE_STORY_ERROR, error);
};

export const updateStoryStart = () => {
    return createAction(STORIES_ACTION_TYPES.UPDATE_STORY_START);
};

export const updateStorySuccess = (story) => {
    return createAction(STORIES_ACTION_TYPES.UPDATE_STORY_SUCCESS, story);
};

export const updateStoryError = (error) => {
    return createAction(STORIES_ACTION_TYPES.UPDATE_STORY_ERROR, error);
};

export const searchStory = (term) => {
    return createAction(STORIES_ACTION_TYPES.SEARCH_STORY, term);
};

export const selectStoriesAsync =  (page = 0, searchTerm = 'hau') => async (dispatch) => {
    console.log("HERE SEKECT : ", page, searchTerm)
    dispatch(selectStoriesStart());
    try {
        const response = await axios.get(`/api/story/page/${page}/${searchTerm}`);
        dispatch(selectStoriesSuccess(response.data));
    } catch (error) {
        dispatch(selectStoriesError(error))
    }
};

export const addStoryAsync = (story) => async (dispatch) => {
    dispatch(addStoryStart());
    try {
        const response = await axios.post('/api/story', {...story})
        dispatch(addStorySuccess(response.data));
    } catch (error) {
        dispatch(addStoryError({error: error.message}));
    }
}

export const removeStoryAsync = (id) => async (dispatch) => {
    dispatch(removeStoryStart());
    try {
        console.log("About to send ID: ", id)
        const response = await axios.delete(`/api/story/${id}`);
        dispatch(removeStorySuccess(response.data))
    } catch (error) {
        dispatch(removeStoryError(error));
    }
} 

export const updateStoryAsync = (story) => async (dispatch) => {
    dispatch(updateStoryStart(story));
    try {
        const response = await axios.put('/api/story', {...story});
        dispatch(updateStorySuccess(response.data));
    } catch (error) {
        dispatch(updateStoryError(error));
    }
}