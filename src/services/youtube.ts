import { youtubeApi } from '@/apis';
import type { Video } from '@/types';

export const youtubeService = {
  searchVideos: async (q: string): Promise<Video[]> => {
    const res = await youtubeApi.searchVideos(q);

    return res.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  },
};
