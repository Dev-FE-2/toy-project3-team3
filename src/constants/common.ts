import defaultProfile from '@/assets/img/profile/default_profile.webp';

// Avatar 사진
export const DEFAULT_PROFILE = defaultProfile;

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

export const SORT_COMMENT_OPTIONS = {
  latest: '최신순',
  likes: '좋아요순',
} as const;

export const SORT_ETC_OPTIONS = {
  latest: '최신순',
  likes: '좋아요순',
  subscribers: '구독순',
} as const;
