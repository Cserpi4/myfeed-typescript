const BASE_URL = 'https://www.reddit.com';

export async function fetchPosts(subreddit = 'popular', limit = 25) {
  const response = await fetch(
    `${BASE_URL}/r/${subreddit}.json?limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  return data.data.children.map(child => child.data);
}

export async function fetchComments(postId) {
  const response = await fetch(
    `${BASE_URL}/comments/${postId}.json`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ID: ${postId}`);
  }
  const data = await response.json();
  return data[1].data.children.map(child => child.data);
}

export async function fetchSubreddits(limit = 10) {
  const response = await fetch(
    `${BASE_URL}/subreddits/popular.json?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch subreddits');
  }
  const json = await response.json();
  return json.data.children.map(child => child.data);
}

export async function search(query, limit = 25) {
  const response = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to search Reddit for query: ${query}`);
  }
  const data = await response.json();
  return data.data.children.map(child => child.data);
}
