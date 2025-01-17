declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: {
            autoplay?: 0 | 1;
            controls?: 0 | 1;
            rel?: 0 | 1;
          };
        },
      ) => void;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export type PlaylistOrComment = 'playlist' | 'comment';
