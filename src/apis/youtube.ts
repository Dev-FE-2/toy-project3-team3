import axios from 'axios';
import type { YouTubeSearchResponse } from '@/types';
import { YOUTUBE_API_BASE_URL, YOUTUBE_API_KEY } from '@/constants';

export const youtubeApi = {
  searchVideos: async (q: string) => {
    const { data } = await axios.get<YouTubeSearchResponse>(
      `${YOUTUBE_API_BASE_URL}/search`,
      {
        params: {
          part: 'snippet',
          maxResults: 20,
          q,
          type: 'video',
          key: YOUTUBE_API_KEY,
        },
      },
    );

    return data;
  },
};
