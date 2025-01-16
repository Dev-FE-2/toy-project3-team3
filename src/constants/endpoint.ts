export const API_BASE_PATH = '/rest/v1';

export const API_ENDPOINTS = {
  USERS: {
    BASE: '/USERS',
    BY_ID: (userId: string) =>
      `${API_ENDPOINTS.USERS.BASE}?user_id=eq.${userId}`,
  },
  FOLLOWS: {
    BASE: '/FOLLOWS',
    BY_FOLLOWER_USER_ID_AND_FOLLOWING_USER_ID: (
      followerUserId: string,
      followingUserId: string,
    ) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?and=(follower_user_id.eq.${followerUserId},following_user_id.eq.${followingUserId})`,
    FOLLOWERS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?following_user_id=eq.${userId}`,
    FOLLOWINGS_BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.FOLLOWS.BASE}?follower_user_id=eq.${userId}`,
  },
  CATEGORY: {
    BASE: '/CATEGORY',
    BY_ID: (categoryId: string) =>
      `${API_ENDPOINTS.CATEGORY.BASE}?category_id=eq.${categoryId}`,
    BY_CATEGORY_NAME_EN: (categoryNameEn: string) =>
      `${API_ENDPOINTS.CATEGORY.BASE}?category_name_en=eq.${categoryNameEn}`,
  },
  PLAYLISTS: {
    BASE: '/PLAYLISTS',
    BY_ID: (playlistId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?playlist_id=eq.${playlistId}`,
    BY_IDS: (playlistIds: string[]) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?playlist_id=in.(${playlistIds.join(',')})`,
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?user_id=eq.${userId}`,
    BY_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.PLAYLISTS.BASE}?and=(playlist_id.eq.${playlistId},user_id.eq.${userId})`,
  },
  PLAYLIST_VIDEOS: {
    BASE: 'PLAYLIST_VIDEOS',
    BY_ID: (playlistVideoId: string) =>
      `${API_ENDPOINTS.PLAYLIST_VIDEOS.BASE}?playlist_videos_id=eq.${playlistVideoId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.PLAYLIST_VIDEOS.BASE}?playlist_id=eq.${playlistId}`,
  },
  HASHTAGS: {
    BASE: 'HASHTAGS',
    BY_ID: (hashtagId: string) =>
      `${API_ENDPOINTS.HASHTAGS.BASE}?hashtag_id=eq.${hashtagId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.HASHTAGS.BASE}?playlist_id=eq.${playlistId}`,
  },
  SUBSCRIBES: {
    BASE: '/SUBSCRIBES',
    BY_ID: (subscribeId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?subscribe_id=eq.${subscribeId}`,
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?playlist_id=eq.${playlistId}`,
    BY_ID_AND_USER_ID: (subscribeId: string, userId: string) =>
      `${API_ENDPOINTS.SUBSCRIBES.BASE}?and=(subscribe_id.eq.${subscribeId},user_id.eq.${userId})`,
  },
  LIKES: {
    BASE: '/LIKES',
    BY_ID: (likeId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?likes_id=eq.${likeId}`,
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?user_id=eq.${userId}`,
    BY_PLAYLIST_ID: (playlistId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?playlist_id=eq.${playlistId}`,
    BY_COMMENT_ID: (commentId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?comments_id=eq.${commentId}`,
    BY_PLAYLIST_ID_AND_USER_ID: (playlistId: string, userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?and=(playlist_id.eq.${playlistId},user_id.eq.${userId})`,
    BY_COMMENT_ID_AND_USER_ID: (commentId: string, userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?and=(comments_id.eq.${commentId},user_id.eq.${userId})`,
    BY_ID_AND_USER_ID: (likeId: string, userId: string) =>
      `${API_ENDPOINTS.LIKES.BASE}?and=(likes_id.eq.${likeId},user_id.eq.${userId})`,
  },
  COMMENTS: {
    BASE: 'COMMENTS',
    BY_ID: (commentId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?comments_id=eq.${commentId}`,
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?user_id=eq.${userId}`,
    BY_TARGET_PLAYLIST_ID: (targetPlaylistId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?target_playlist_id=eq.${targetPlaylistId}`,
    BY_TARGET_COMMENT_ID: (targetCommentId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?target_comments_id=eq.${targetCommentId}`,
    BY_ID_AND_USER_ID: (commentId: string, userId: string) =>
      `${API_ENDPOINTS.COMMENTS.BASE}?and=(comments_id.eq.${commentId},user_id.eq.${userId})`,
  },
  ALERTS: {
    BASE: 'ALERTS',
    BY_ALERT_ID: (alertId: string) =>
      `${API_ENDPOINTS.ALERTS.BASE}?alert_id=eq.${alertId}`,
    BY_TO_USER_ID: (toUserId: string) =>
      `${API_ENDPOINTS.ALERTS.BASE}?to_user_id=eq.${toUserId}`,
    BY_TO_USER_ID_NOT_CHECKED: (toUserId: string) =>
      `${API_ENDPOINTS.ALERTS.BASE}?to_user_id=eq.${toUserId}&is_checked=eq.${false}&select=*,from_user_id(*),to_user_id(*)`,
  },
  ALERT_TYPES: {
    BASE: 'ALERT_TYPES',
    BY_ALERT_TYPE_ID: (alertTypeId: string) =>
      `${API_ENDPOINTS.ALERT_TYPES.BASE}?alert_type_id=eq.${alertTypeId}`,
  },
};
