import { STORY_VOTES_ACTION_TYPES } from './story_vote.types';


export const initialStoryVoteState = {
    isLoading: false,
    error: null,
    storyVotes: []
}

export const storyVoteReducer = (state = initialStoryVoteState, action) => {
    const {type, payload} = action;
    console.log("Initial state: ", state, action)
    let changedStories = null;
    switch (type) {
        case STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_SUCCESS:
            console.log("Reducer: ", [...state.storyVotes, payload])
            return {
                ...state,
                isLoading: false,
                error: null,
                storyVotes: [...state.storyVotes, payload],
            };
        case STORY_VOTES_ACTION_TYPES.ADD_STORY_VOTE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
}

