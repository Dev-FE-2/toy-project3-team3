import { EDIT_MODE } from '@/constants';
import { CategoryType } from '@/types/common';
import { Video } from '@/types/youtube';

export type EditMode = (typeof EDIT_MODE)[keyof typeof EDIT_MODE];

export interface VideoSearchHookResult {
  videoData: Video[] | undefined;
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
  handleSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  isError: boolean;
  filteredData: Video[];
}

export interface PlayListEditFormValues {
  title: string;
  description: string;
  category: CategoryType;
  thumbnailUrl: string;
  hashtags: string[];
  playLists: Video[];
}
