import { createSelector } from 'reselect';

const selectCommentVoteReducer = (state) => state.commentVote;

export const selectCommentVotes = (commentId) => createSelector(
    [selectCommentVoteReducer],
    (commentVote) => ({
        commentVotes: commentVote.commentVotes.filter(cv => cv.commentId === +commentId),
        ...commentVote
    })
);