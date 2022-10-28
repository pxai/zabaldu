import { STORIES_ACTION_TYPES } from './story.types';

const updateStoryFromStories = (stories, storyToUpdate) => {
    const filteredStories = stories.filter( story => story.id !== storyToUpdate.id);

    return [...filteredStories, storyToUpdate];
}

export const initialStoryState = {
    isLoading: false,
    error: null,
    stories: [],
    searchTerm: '',
}

export const storyReducer = (state = initialStoryState, action) => {
    const {type, payload} = action;
    console.log("Initial state: ", state, action)
    let changedStories = null;
    switch (type) {
        case STORIES_ACTION_TYPES.SELECT_STORIES_START:
            return {
                ...state,
                isLoading: true
            };
        case STORIES_ACTION_TYPES.SELECT_STORIES_SUCCESS:
            return {
                ...state,
                stories: payload,
                isLoading: false,
                error: null
            };
        case STORIES_ACTION_TYPES.SELECT_STORIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case STORIES_ACTION_TYPES.ADD_STORY_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case STORIES_ACTION_TYPES.ADD_STORY_SUCCESS:
            console.log("Reducer: ", [...state.stories, payload])
            return {
                ...state,
                isLoading: false,
                error: null,
                stories: [...state.stories, payload],
            };
        case STORIES_ACTION_TYPES.ADD_STORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case STORIES_ACTION_TYPES.UPDATE_STORY_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case STORIES_ACTION_TYPES.UPDATE_STORY_SUCCESS:
            changedStories = updateStoryFromStories(state.stories, payload);
            return {
                ...state,
                stories: changedStories,
                isLoading: false,
            };
        case STORIES_ACTION_TYPES.UPDATE_STORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case STORIES_ACTION_TYPES.REMOVE_STORY_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case STORIES_ACTION_TYPES.REMOVE_STORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stories: state.stories.filter(story => story.id !== payload.id)
            };
        case STORIES_ACTION_TYPES.REMOVE_STORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case STORIES_ACTION_TYPES.SEARCH_STORY:
            return {
                ...state,
                searchTerm: payload,
            };
        default:
            return state;
    }
}

