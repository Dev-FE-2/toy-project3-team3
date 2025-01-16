import { supabase } from '@/apis';

export const getVideoCnt = async (playlistId: string) => {
  const { count, error } = await supabase
    .from('PLAYLIST_VIDEOS')
    .select('*', { count: 'exact' })
    .eq('playlist_id', playlistId);

  if (error) {
    console.error(`Failed to fetch videos for playlist ${playlistId}`, error);
    return 0;
  } else {
    return count || 0;
  }
};

export const getLikeCnt = async (playlistId: string) => {
  const { count, error } = await supabase
    .from('LIKES')
    .select('*', { count: 'exact' })
    .eq('playlist_id', playlistId);

  if (error) {
    console.error(`Failed to fetch likes for playlist ${playlistId}`, error);
    return 0;
  } else {
    return count || 0;
  }
};

export const getSubscribeCnt = async (playlistId: string) => {
  const { count, error } = await supabase
    .from('SUBSCRIBES')
    .select('*', { count: 'exact' })
    .eq('playlist_id', playlistId);

  if (error) {
    console.error(
      `Failed to fetch subscribes for playlist ${playlistId}`,
      error,
    );
    return 0;
  } else {
    return count || 0;
  }
};

export const getUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('USERS')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error(`Failed to fetch info for user ${userId}`, error);
  } else {
    return data[0];
  }
};

export const getIsLiked = async (playlistId: string, userId: string) => {
  const { count, error } = await supabase
    .from('LIKES')
    .select('*', { count: 'exact' })
    .eq('playlist_id', playlistId)
    .eq('user_id', userId);

  if (error) {
    console.error(`Failed to fetch isLiked for playlist ${playlistId}`, error);
    return false;
  } else {
    return count === 0 ? false : true;
  }
};

export const getIsSubscribed = async (playlistId: string, userId: string) => {
  const { count, error } = await supabase
    .from('SUBSCRIBES')
    .select('*', { count: 'exact' })
    .eq('playlist_id', playlistId)
    .eq('user_id', userId);

  if (error) {
    console.error(
      `Failed to fetch isSubscribed for playlist ${playlistId}`,
      error,
    );
    return false;
  } else {
    return count === 0 ? false : true;
  }
};
