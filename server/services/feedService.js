import fetchWithHeaders from '../utils/fetchWithHeaders.js';

const FeedService = {
  async getPopular() {
    const data = await fetchWithHeaders('/api/v3/post/list', {
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getSubreddit(name) {
    const data = await fetchWithHeaders('/api/v3/post/list', {
      community_name: name,
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getComments(subreddit, postId) {
    const data = await fetchWithHeaders('/api/v3/comment/list', {
      post_id: postId,
      sort: 'Hot',
      limit: 50,
    });
    return normalizeCommentList(data.comments);
  },

  async search(query) {
    const data = await fetchWithHeaders('/api/v3/search', {
      q: query,
      type_: 'Posts',
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getSubreddits() {
    const data = await fetchWithHeaders('/api/v3/community/list', {
      sort: 'Hot',
      limit: 25,
    });
    return normalizeCommunityList(data.communities);
  },
};

// --- Reddit-kompatibilis shape, hogy a Card.jsx változatlan maradhasson ---
function normalizeRedditShape(posts = []) {
  return {
    data: {
      children: posts.map((p) => ({
        data: {
          id: String(p.post.id),
          title: p.post.name,
          // Lemmy thumbnail_url már teljes https URL, a Card ezt fel is ismeri
          thumbnail: p.post.thumbnail_url || null,
          preview: null, // Lemmy-nél nincs reddit-style preview.images struktúra
          subreddit: p.community.name,
          subreddit_name_prefixed: `c/${p.community.name}`,
          author: p.creator?.name || '[deleted]',
          ups: p.counts?.score ?? 0,
          created_utc: new Date(p.post.published).getTime() / 1000,
          num_comments: p.counts?.comments ?? 0,
          sr_detail: { icon_img: p.community?.icon || null },
          subreddit_icon_img: p.community?.icon || null,
        },
      })),
    },
  };
}

function normalizeCommentList(comments = []) {
  return comments.map((c) => ({
    id: String(c.comment.id),
    author: c.creator?.name || '[deleted]',
    body: c.comment.content,
    score: c.counts?.score ?? 0,
    created_utc: new Date(c.comment.published).getTime() / 1000,
  }));
}

function normalizeCommunityList(communities = []) {
  return {
    data: {
      children: communities.map((c) => ({
        data: {
          display_name: c.community.name,
          title: c.community.title,
          subscribers: c.counts?.subscribers ?? 0,
          icon_img: c.community.icon || null,
        },
      })),
    },
  };
}

export default FeedService;