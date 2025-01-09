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
};
