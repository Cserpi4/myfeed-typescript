// src/tests/unit/features/postSlice.test.js
import postReducer, { clearPosts } from '../../../features/post/postSlice';

describe('postSlice reducer', () => {
  const initialState = {
    posts: [],
    status: 'idle',
    error: null,
  };

  it('should return the initial state', () => {
    expect(postReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle clearPosts action', () => {
    const previousState = {
      posts: [{ id: 1, title: 'Test post' }],
      status: 'succeeded',
      error: null,
    };
    expect(postReducer(previousState, clearPosts())).toEqual(initialState);
  });

  it('should handle fetchPosts.pending', () => {
    const action = { type: 'post/fetchPosts/pending' };
    const state = postReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchPosts.fulfilled', () => {
    const fakePosts = [{ id: 'abc', title: 'First post' }];
    const action = { type: 'post/fetchPosts/fulfilled', payload: fakePosts };
    const state = postReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.posts).toEqual(fakePosts);
    expect(state.error).toBeNull();
  });

  it('should handle fetchPosts.rejected', () => {
    const action = { type: 'post/fetchPosts/rejected', error: { message: 'API error' } };
    const state = postReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('API error');
  });
});
