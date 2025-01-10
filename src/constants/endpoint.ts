export const API_BASE_PATH = '/rest/v1';

export const API_ENDPOINTS = {
  USERS: {
    BASE: '/USERS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.USERS.BASE}?user_id=eq.${userId}`,
  },
  FOLLOWS: {
    BASE: '/FOLLOWS',
    BY_FOLLOWING_USER_ID_AND_FOLLOWER_USER_ID: (
      followerUserId: string,
      followingUserId: string,
    ) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?and=(follower_user_id.eq.${followerUserId},following_user_id.eq.${followingUserId})`,
    FOLLOWERS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?following_user_id=eq.${userId}`,
    FOLLOWINGS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?follower_user_id=eq.${userId}`,
  },
  PLAYLISTS: {
    BASE: '/PLAYLISTS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?playlist_id=eq.${playlistId}`,
    BY_PLAYLIST_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?and=(playlist_id.eq.${playlistId},user_id.eq.${userId})`,
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
      `${API_ENDPOINTS.LIKES.BASE}?comments_id=eq.${commentId}`,
    BY_PLAYLIST_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?and=(playlist_id.eq.${playlistId},user_id.eq.${userId})`,
    BY_COMMENT_ID_AND_USER_ID: (commentId: string, userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?and=(comments_id.eq.${commentId},user_id.eq.${userId})`,
  },
  COMMENTS: {
    BASE: 'COMMENTS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?target_playlist_id=eq.${playlistId}`,
    BY_COMMENT_ID: (commentId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?target_comments_id=eq.${commentId}`,
    BY_PLAYLIST_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?and=(target_playlist_id.eq.${playlistId},user_id.eq.${userId})`,
    BY_COMMENT_ID_AND_USER_ID: (commentId: string, userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?and=(target_comments_id.eq.${commentId},user_id.eq.${userId})`,
  },
  ALERTS: {
    BASE: 'ALERTS',
    BY_ALERT_ID: (alertId: string) =>
      `${API_ENDPOINTS.ALERTS.BASE}?alert_id=eq.${alertId}`,
    BY_TO_USER_ID: (toUserId: string) =>
      `${API_ENDPOINTS.ALERTS.BASE}?to_user_id=eq.${toUserId}`,
  },
  ALERT_TYPES: {
    BASE: 'ALERT_TYPES',
    BY_ALERT_TYPE_ID: (alertTypeId: string) =>
      `${API_ENDPOINTS.ALERT_TYPES.BASE}?alert_type_id=eq.${alertTypeId}`,
  },
};
