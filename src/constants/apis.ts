export const FILE_PATH = {
  PROFILE: 'USER_PROFILE_IMAGE',
  PLAY_LIST: 'PLAYLIST_THUMBNAIL_IMAGE',
} as const;

export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
