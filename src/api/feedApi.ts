import client from './client';

interface FeedResponse {
  data: {
    children: { data: any }[];
  };
}

const feedApi = {
  async fetchPosts(): Promise<FeedResponse> {
    const response = await client.get('/api/feed/popular');
    return response.data;
  },

  async fetchSubreddit(subreddit: string): Promise<FeedResponse> {
    const response = await client.get(`/api/feed/subreddit/${subreddit}`);
    return response.data;
  },

  async fetchComments(subreddit: string, postId: string): Promise<any> {
    const response = await client.get(
      `/api/feed/comments/${subreddit}/${postId}`
    );
    return response.data;
  },

  async fetchSubreddits(): Promise<FeedResponse> {
    const response = await client.get('/api/feed/subreddits');
    return response.data;
  },

  async search(query: string): Promise<FeedResponse> {
    const response = await client.get(
      `/api/feed/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

export default feedApi;