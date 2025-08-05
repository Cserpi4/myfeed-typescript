// src/tests/unit/features/commentSlice.test.js

import commentReducer, { fetchComments, clearComments } from '../../../features/comment/commentSlice';

describe('commentSlice', () => {
  const initialState = {
    comments: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(commentReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearComments', () => {
    const previousState = {
      comments: [{ id: '1', body: 'Test comment' }],
      status: 'succeeded',
      error: null,
    };
    expect(commentReducer(previousState, clearComments())).toEqual(initialState);
  });

  it('should handle fetchComments.pending', () => {
    const action = { type: fetchComments.pending.type };
    const state = commentReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchComments.fulfilled', () => {
    const mockComments = [{ id: '1', body: 'Test comment' }];
    const action = { type: fetchComments.fulfilled.type, payload: [null, { data: { children: mockComments.map(c => ({ data: c })) } }] };
    const state = commentReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.comments).toEqual(mockComments);
  });

  it('should handle fetchComments.rejected', () => {
    const action = { type: fetchComments.rejected.type, error: { message: 'Fetch failed' } };
    const state = commentReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Fetch failed');
  });
});
