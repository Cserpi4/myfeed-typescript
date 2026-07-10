import { combineReducers } from '@reduxjs/toolkit';

import avatarReducer from '../features/avatar/avatarSlice';
import commentReducer from '../features/comment/commentSlice';
import headerReducer from '../features/header/headerSlice';
import homeReducer from '../features/home/homeSlice';
import postReducer from '../features/post/postSlice';
import subredditReducer from '../features/subreddits/subredditSlice';
import searchReducer from '../features/search/searchSlice';

const rootReducer = combineReducers({
  avatar: avatarReducer,
  comment: commentReducer,
  header: headerReducer,
  home: homeReducer,
  post: postReducer,
  subreddits: subredditReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;