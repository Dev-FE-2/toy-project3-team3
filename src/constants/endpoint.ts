export const API_BASE_PATH = '/rest/v1';

export const API_ENDPOINTS = {
  USERS: {
    BASE: '/USERS',
    BY_USER_ID: (userId: string) =>
      `${API_ENDPOINTS.USERS.BASE}?user_id=eq.${userId}`,
  },
};
