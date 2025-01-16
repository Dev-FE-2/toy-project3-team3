import type { Database, PlayListEditFormValues, Video } from '@/types';

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

export const formatPlaylistVideosOrigin = (
  playlistVideoData: Database['public']['Tables']['PLAYLIST_VIDEOS']['Row'][],
) => {
  return playlistVideoData
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.video_id,
      title: item.video_title,
      thumbnail: item.video_thumbnail,
      channelTitle: item.video_channel_title,
    }));
};

export const formatPlaylistsOrigin = (
  playlistsData: Database['public']['Tables']['PLAYLISTS']['Row'][],
) => {
  return {
    description: playlistsData[0].short_intro,
    title: playlistsData[0].title,
  };
};
