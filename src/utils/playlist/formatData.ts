import type { PlayListEditFormValues, Video } from '@/types';

export const formatPlaylistVideos = (
  playlist_id: string,
  playlistVideos: Video[],
) => {
  return playlistVideos.map((item, index) => ({
    playlist_id,
    order: index,
    video_id: item.id,
    video_title: item.title,
    video_thumbnail: item.thumbnail,
    video_channel_title: item.channelTitle,
  }));
};

export const formatHashtags = (playlist_id: string, hashtags: string[]) => {
  return hashtags.map((hashtag) => ({
    playlist_id,
    hashtag_name: hashtag,
  }));
};

export const formatPlaylists = (
  user_id: string,
  playlistsData: PlayListEditFormValues,
) => {
  return {
    short_intro: playlistsData.description,
    title: playlistsData.title,
    category_id: playlistsData.category,
    user_id,
  };
};
