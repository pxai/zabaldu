import { STORY_VOTES_ACTION_TYPES } from './story_vote.types';
import axios from 'axios';
import { createAction } from '../../utils/reducer/reducer.utils';

export const addStoryVoteStart = () => {
    return createAction(STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_START);
};

export const addStoryVoteSuccess = (storyVote) => {
    return createAction(STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_SUCCESS, storyVote);
};

export const addStoryVoteError = (error) => {
    return createAction(STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_ERROR, error);
};

export const addStoryVoteAsync = (storyVote) => async (dispatch) => {
    dispatch(addStoryVoteStart());
    try {
        console.log(storyVote)
        const response = await axios.post(`/api/story/${storyVote.storyId}/vote`, {...storyVote})
        dispatch(addStoryVoteSuccess(response.data));
    } catch (error) {
        dispatch(addStoryVoteError(error));
    }
}
