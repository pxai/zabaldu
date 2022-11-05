import { createSelector } from 'reselect';

const selectCommentReducer = (state) => state.comment;
export const selectSearchTerm = (state) => state.comment.searchTerm;


export const selectComments = (storyId) => createSelector(
    [selectCommentReducer],
    (comment) => comment.comments.filter(c => c.storyId === +storyId)
);

export const selectCommentCount = createSelector(
    [selectCommentReducer],
    (comments) => comments.length
);
