import { createSelector } from 'reselect';

const selectStoryReducer = (state) => state.story;
export const selectSearchTerm = (state) => state.story.searchTerm;

export const selectStories = createSelector(
    [selectStoryReducer],
    (story) => {
        const stories = story.stories;
        const storiesPages = Math.ceil(story.totalStories/10);
        return {stories, storiesPages};
    }
);

export const selectStoryError = createSelector(
    [selectStoryReducer],
    (story) => ({error: story.error, isLoading: story.isLoading, createdStory: story.createdStory})
);

export const selectStory = (id) => createSelector(
    [selectStoryReducer],
    (story) => {
        const currentStory = story.stories.filter(s => s.id === +id)[0];
        const commentPages = Math.ceil(currentStory.comments/10);
        return {...currentStory, commentPages};
    }
);


export const selectStoryCount = createSelector(
    [selectStoryReducer],
    (stories) => stories.length
);
