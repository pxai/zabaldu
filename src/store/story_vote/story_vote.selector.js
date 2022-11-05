import { createSelector } from 'reselect';

const selectStoryVoteReducer = (state) => state.storyVote;

export const selectStoryVotes = (storyId) => createSelector(
    [selectStoryVoteReducer],
    (storyVote) => storyVote.votes[0]
);