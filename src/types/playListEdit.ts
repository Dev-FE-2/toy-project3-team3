import { EDIT_MODE } from '@/constants';
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
