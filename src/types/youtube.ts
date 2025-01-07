export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export interface Playlist {
  id: string;
  name: string;
  videos: Video[];
}
