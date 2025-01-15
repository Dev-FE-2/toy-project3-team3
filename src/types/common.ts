import { ChangeEvent, ReactNode } from 'react';
import { CATEGORIES } from '@/constants';

// Icon
export type IconType =
  | 'like'
  | 'subscribe'
  | 'menu'
  | 'alarm'
  | 'comment'
  | 'cancel'
  | 'backward'
  | 'alarm'
  | 'search'
  | 'drag'
  | 'bottomSheet'
  | 'home'
  | 'searchNav'
  | 'signUp'
  | 'signIn'
  | 'following'
  | 'profile';

export interface IconProps {
  type: IconType;
  isActive?: boolean;
  onClick?: () => void;
}

// nav
export interface StyledNavProps {
  $isActive: boolean;
}

// Avatar
export type AvatarSize = 'xsmall' | 'small' | 'medium';

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
export type CategoryType = (typeof CATEGORIES)[number];

export type SortCommentType = 'latest' | 'likes';
export type SortEtcType = 'latest' | 'likes' | 'subscribers';

export type SelectType = 'category' | 'sortComment' | 'sortEtc';

export interface SelectProps {
  ref?: React.Ref<HTMLSelectElement>;
  type: SelectType;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
}

export interface StyledSelectProps {
  $errorMessage?: boolean;
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
interface BaseInputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  ref?: React.Ref<T>;
  errorMessage?: string;
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<T>) => void;
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onBlur?: (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => void;
}
interface TextInputProps extends BaseInputProps<HTMLInputElement> {
  type: 'text' | 'email' | 'password';
  watchedValue?: string;
  label: string; // 인풋 왼쪽 위 작은 placeholder
  validatedMessage?: string;
}
interface TextAreaProps extends BaseInputProps<HTMLTextAreaElement> {
  type: 'textarea';
  spellCheck?: boolean;
}

export type InputProps = TextInputProps | TextAreaProps;

export interface StyledInputProps {
  $errorMessage?: boolean;
  $validatedMessage?: string;
}

export interface FloatingLabelProps {
  htmlFor: string;
  $errorMessage: boolean;
  $isActive: boolean;
}

// modal
export interface ModalPortalProps {
  children: ReactNode;
  blockClick?: boolean;
}
export type AlertStatus = 'success' | 'error';
export interface AlertProps {
  status: AlertStatus;
  text: string;
}

export interface AlertContextType {
  addAlert: (text: string, status: 'success' | 'error') => void;
  removeAlert: (id: string) => void;
}

export interface StyledAlertProps {
  $status: AlertStatus;
  $show: boolean;
}

export type ConfirmContent = {
  text: string;
  leftBtn: string;
  rightBtn: string;
};

export interface ConfirmProps {
  content: ConfirmContent;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}
