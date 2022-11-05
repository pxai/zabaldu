import { combineReducers } from 'redux';
import { storyReducer } from './story/story.reducer';
import { commentReducer } from './comment/comment.reducer';
import { storyVoteReducer } from './story_vote/story_vote.reducer';
import { commentVoteReducer } from './comment_vote/comment_vote.reducer';

export const rootReducer = combineReducers({
  story: storyReducer,
  comment: commentReducer,
  storyVote: storyVoteReducer,
  commentVote: commentVoteReducer,
});