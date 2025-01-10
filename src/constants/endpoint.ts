export const API_BASE_PATH = '/rest/v1';

export const API_ENDPOINTS = {
  USERS: {
    BASE: '/USERS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.USERS.BASE}?user_id=eq.${userId}`,
  },
  FOLLOWS: {
    BASE: '/FOLLOWS',
    FOLLOWERS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?following_user_id=eq.${userId}`,
    FOLLOWINGS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?follower_user_id=eq.${userId}`,
    FOLLOWING_AND_FOLLOWER_BY_USER_ID: (
      followerUserId: string,
      followingUserId: string,
    ) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?and=(follower_user_id.eq.${followerUserId},following_user_id.eq.${followingUserId})`,
  },
  PLAYLISTS: {
    BASE: '/PLAYLISTS',
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?playlist_id=eq.${playlistId}`,
  },
  PLAYLIST_VIDEOS: {
    BASE: 'PLAYLIST_VIDEOS',
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.PLAYLIST_VIDEOS.BASE}?playlist_id=eq.${playlistId}`,
  },
  HASHTAGS: {
    BASE: 'HASHTAGS',
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.HASHTAGS.BASE}?playlist_id=eq.${playlistId}`,
  },
  SUBSCRIBES: {
    BASE: '/SUBSCRIBES',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?playlist_id=eq.${playlistId}`,
    BY_PLAYLIST_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?and=(playlist_id.eq.${playlistId},user_id.eq.${userId})`,
  },
  LIKES: {
    BASE: '/LIKES',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?playlist_id=eq.${playlistId}`,
    BY_COMMENT_ID: (commentId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?comment_id=eq.${commentId}`,
  },
  COMMENTS: {
    BASE: 'COMMENTS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?playlist_id=eq.${playlistId}`,
    BY_COMMENT_ID: (commentId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?comment_id=eq.${commentId}`,
  },
};
