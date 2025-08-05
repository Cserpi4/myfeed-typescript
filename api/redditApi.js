const BASE_URL = 'https://www.reddit.com';

export async function fetchPosts(subreddit = 'popular', limit = 25) {
  const url = `${BASE_URL}/r/${subreddit}.json?limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch posts from /r/${subreddit}`);
  const data = await response.json();
  return data.data.children.map(child => child.data);
}

export async function fetchComments(postId) {
  const url = `${BASE_URL}/comments/${postId}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch comments for post ID: ${postId}`);
  const data = await response.json();
  return data[1].data.children.map(child => child.data);
}

export async function search(query, limit = 25) {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to search Reddit for query: ${query}`);
  const data = await response.json();
  return data.data.children.map(child => child.data);
}
