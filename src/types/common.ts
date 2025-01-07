import { UseFormRegisterReturn } from 'react-hook-form';

// Icon
export type IconType =
  | 'like'
  | 'comment'
  | 'subscribe'
  | 'cancel'
  | 'backward'
  | 'alarm'
  | 'search'
  | 'drag';

export interface IconProps {
  type: IconType;
  isActive?: boolean;
  onClick?: () => void;
}

// Avatar
export type AvatarSize = 'small' | 'medium';

export interface AvatarProps {
  size: AvatarSize;
  imageUrl?: string;
  altText?: string;
  onClick?: () => void;
}

// Hashtag
export interface HashTagProps {
  content: string;
  onClick?: () => void;
}

// Category
export interface CategoryProps {
  type?: 'tab' | 'mark'; // 용도 구분 - 메인 페이지 | 플레이리스트아이템
  content: string;
  isActive?: boolean;
  onClick?: () => void;
}

// LikeAndSubscribe
export interface LikeAndSubscribeProps {
  likeCnt: number;
  subscribeCnt: number;
  isLiked: boolean;
  isSubscribed: boolean;
  onLikeClick: () => void;
  onSubscribeClick: () => void;
}

// Button
type BtnColor = 'primary' | 'secondary' | 'gray';
type BtnBorderType = 'square' | 'round' | 'circle';
type BtnSize = 'small' | 'medium';

// circle 버튼
export interface StyledPlusBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export interface BtnProps extends StyledPlusBtnProps {
  color?: BtnColor;
  borderType?: BtnBorderType;
  size?: BtnSize;
}

// DOM으로 전달되는 스타일 관련 props에 $ prefix 사용
export interface StyledBtnProps {
  $color?: BtnColor;
  $borderType?: BtnBorderType;
  $size?: BtnSize;
}

// Select
export type CategoryType =
  | 'all'
  | 'korean'
  | 'chinese'
  | 'western'
  | 'japanese'
  | 'fusion'
  | 'southeast'
  | 'middleEast'
  | 'southAmerica'
  | 'northEurope'
  | 'africa'
  | 'indian';
export type SortCommentType = 'latest' | 'likes';
export type SortEtcType = 'latest' | 'likes' | 'subscribers';

type SelectType = 'category' | 'sortComment' | 'sortEtc';

export interface SelectProps {
  type: SelectType;
  value: string;
  onChange: (value: string) => void;
}

// Search
export interface SearchProps {
  queryKey: string;
  placeholder?: string;
}

// Tabs
export interface TabsContextType {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  label: string;
}

export interface TabsProps {
  label: string;
  defaultValue: number;
  children: React.ReactNode;
}

export interface TabTriggerProps {
  value: number;
  text: string;
}

export interface TabPanelProps {
  value: number;
  children: React.ReactNode;
}

export interface TabListProps {
  children: React.ReactElement<TabTriggerProps>[];
}

// Each Playlist
export interface EachPlaylistProps {
  thumbnailUrl: string;
  videoCnt: number;
  avatarUrl: string;
  userName: string;
  updateDate: string;
  likeCnt: number;
  subscribeCnt: number;
  isLiked: boolean;
  isSubscribed: boolean;
  playListTitle: string;
  onLikeClick: () => void;
  onSubscribeClick: () => void;
}

// Input
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type: 'text' | 'textarea' | 'email' | 'password';
  id: string;
  register?: UseFormRegisterReturn;
  errorMessage: string;
  placeholder: string;
  label: string; // input 필드 오른쪽 위에 붙을 한글 이름
}

export interface StyledInputProps {
  $errorMessage: boolean;
}

export interface FloatingLabelProps extends StyledInputProps {
  htmlFor: string;
  $errorMessage: boolean;
  $isActive: boolean;
}
