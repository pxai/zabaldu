import { combineReducers } from 'redux';
import { storyReducer } from './story/story.reducer';
import { commentReducer } from './comment/comment.reducer';

export const rootReducer = combineReducers({
  story: storyReducer,
  comment: commentReducer,
});