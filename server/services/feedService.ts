import fetchWithHeaders from '../utils/fetchWithHeaders.js';

interface LemmyCommunity {
  id: number;
  name: string;
  title: string;
  icon?: string | null;
}

interface LemmyCreator {
  id: number;
  name: string;
}

interface LemmyCounts {
  score?: number;
  comments?: number;
  subscribers?: number;
}

interface LemmyPost {
  id: number;
  name: string;
  thumbnail_url?: string | null;
  url?: string | null;
  body?: string | null;
  published: string;
}

interface LemmyPostView {
  post: LemmyPost;
  community: LemmyCommunity;
  creator?: LemmyCreator;
  counts?: LemmyCounts;
}

interface LemmyComment {
  id: number;
  content: string;
  published: string;
}

interface LemmyCommentView {
  comment: LemmyComment;
  creator?: LemmyCreator;
  counts?: LemmyCounts;
}

interface LemmyCommunityView {
  community: LemmyCommunity;
  counts?: LemmyCounts;
}

interface NormalizedPost {
  id: string;
  title: string;
  thumbnail: string | null;
  preview: null;
  subreddit: string;
  subreddit_name_prefixed: string;
  author: string;
  ups: number;
  created_utc: number;
  num_comments: number;
  sr_detail: { icon_img: string | null };
  subreddit_icon_img: string | null;
}

interface NormalizedPostList {
  data: {
    children: { data: NormalizedPost }[];
  };
}

interface NormalizedComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
}

interface NormalizedCommunity {
  display_name: string;
  title: string;
  subscribers: number;
  icon_img: string | null;
}

interface NormalizedCommunityList {
  data: {
    children: { data: NormalizedCommunity }[];
  };
}

const FeedService = {
  async getPopular(): Promise<NormalizedPostList> {
    const data = await fetchWithHeaders('/api/v3/post/list', {
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getSubreddit(name: string): Promise<NormalizedPostList> {
    const data = await fetchWithHeaders('/api/v3/post/list', {
      community_name: name,
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getComments(subreddit: string, postId: string): Promise<NormalizedComment[]> {
    const data = await fetchWithHeaders('/api/v3/comment/list', {
      post_id: postId,
      sort: 'Hot',
      limit: 50,
    });
    return normalizeCommentList(data.comments);
  },

  async search(query: string): Promise<NormalizedPostList> {
    const data = await fetchWithHeaders('/api/v3/search', {
      q: query,
      type_: 'Posts',
      sort: 'Hot',
      limit: 25,
    });
    return normalizeRedditShape(data.posts);
  },

  async getSubreddits(): Promise<NormalizedCommunityList> {
    const data = await fetchWithHeaders('/api/v3/community/list', {
      sort: 'Hot',
      limit: 25,
    });
    return normalizeCommunityList(data.communities);
  },
};

// --- Reddit-kompatibilis shape, hogy a Card komponens változatlan maradhasson ---
function normalizeRedditShape(posts: LemmyPostView[] = []): NormalizedPostList {
  return {
    data: {
      children: posts.map((p) => ({
        data: {
          id: String(p.post.id),
          title: p.post.name,
          thumbnail: p.post.thumbnail_url || null,
          preview: null,
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

function normalizeCommentList(comments: LemmyCommentView[] = []): NormalizedComment[] {
  return comments.map((c) => ({
    id: String(c.comment.id),
    author: c.creator?.name || '[deleted]',
    body: c.comment.content,
    score: c.counts?.score ?? 0,
    created_utc: new Date(c.comment.published).getTime() / 1000,
  }));
}

function normalizeCommunityList(communities: LemmyCommunityView[] = []): NormalizedCommunityList {
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