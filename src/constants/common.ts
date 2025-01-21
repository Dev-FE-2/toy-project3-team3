import defaultProfile from '@/assets/img/profile/default_profile.webp';
import gramLogo from '@/assets/img/logo/gramLogo.webp';

// Avatar 사진
export const DEFAULT_PROFILE = defaultProfile;

// logo
export const GRAM_LOGO = gramLogo;

// Category
export const CATEGORY_OPTIONS = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  western: '양식',
  japanese: '일식',
  fusion: '퓨전',
  southeast: '동남아',
  middleEast: '중동',
  southAmerica: '남미',
  northEurope: '북유럽',
  africa: '아프리카',
  indian: '인도',
} as const;

export const CATEGORIES = ['all', ...Object.keys(CATEGORY_OPTIONS)] as const;

export const CATEGORY_EDIT_OPTIONS = {
  notSelected: '카테고리 선택',
  ...Object.fromEntries(
    Object.entries(CATEGORY_OPTIONS).filter(([key]) => key !== 'all'),
  ),
} as const;

export const SORT_COMMENT_OPTIONS = {
  latest: '최신순',
  likes: '좋아요순',
} as const;

export const SORT_ETC_OPTIONS = {
  latest: '최신순',
  likes: '좋아요순',
  subscribers: '구독순',
} as const;

export const SAFE_AREA = {
  top: 'env(safe-area-inset-top)',
  right: 'env(safe-area-inset-right)',
  left: 'env(safe-area-inset-left)',
  bottom: 'env(safe-area-inset-bottom)',
} as const;

// ALERTS TYPE
export const ALERTS_TYPE_KEYS = [
  'comment_comment',
  'comment_like',
  'playlist_comment',
  'playlist_like',
  'playlist_add',
  'playlist_edit',
  'followed',
  'subscribed',
] as const;
