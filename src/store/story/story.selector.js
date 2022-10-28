import { createSelector } from 'reselect';

const selectStoryReducer = (state) => state.story;
export const selectSearchTerm = (state) => state.story.searchTerm;

export const selectStories = createSelector(
    [selectStoryReducer],
    (story) => story.stories
);

export const selectStory = (id) => createSelector(
    [selectStoryReducer],
    (story) => story.stories[0]
);


export const selectStoryCount = createSelector(
    [selectStoryReducer],
    (stories) => stories.length
);
