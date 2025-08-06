export async function fetchPosts(subreddit = 'popular', limit = 25) {
  const url = `/r/${subreddit}.json?limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch posts from /r/${subreddit}`);
  const data = await response.json();
  return data.data.children.map(child => child.data);
}

export async function fetchComments(postId) {
  const url = `/comments/${postId}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch comments for post ID: ${postId}`);
  const data = await response.json();
  return data[1].data.children.map(child => child.data);
}

export async function search(query, limit = 25) {
  const url = `/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to search Reddit for query: ${query}`);
  const data = await response.json();
  return data.data.children.map(child => child.data);
}
