import styled, { css } from 'styled-components';
import { StyledNavProps } from '@/types';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { HiMiniBookmark } from 'react-icons/hi2';
import { HiOutlineBookmark } from 'react-icons/hi2';
import { IoArrowBack } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { BiCommentDetail, BiSolidCommentDetail } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { HiOutlineHome } from 'react-icons/hi';
import { IoPersonOutline } from 'react-icons/io5';
import { LuKey } from 'react-icons/lu';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';
import { MdDragHandle, MdDragIndicator, MdAdd } from 'react-icons/md';

const IconButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray.dark};
  cursor: pointer;
  transition: color 0.3s;
`;

export const HeartIconEmpty = styled(GoHeart)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
export const HeartIconFilled = styled(GoHeartFill)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const SubscribeEmpty = styled(HiOutlineBookmark)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
export const SubscribeFilled = styled(HiMiniBookmark)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.accent};
`;

export const AlarmIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
export const AlarmIcon = styled(GoBell)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.gray.extraDark};
`;
export const AlarmDot = styled.div`
  position: absolute;
  top: 0px;
  right: 1px;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.highlight};
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  pointer-events: none;
`;

export const CommentIconEmpty = styled(BiCommentDetail)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const CommentIconFilled = styled(BiSolidCommentDetail)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SearchIcon = styled(IoSearch)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.gray.extraDark};
  }
`;

export const BackwardIcon = styled(IoArrowBack)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.gray.extraDark};
`;

export const CancleIcon = styled(IoCloseSharp)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.gray.extraDark};
`;

export const DragIcon = styled(MdDragIndicator)`
  ${IconButton}
`;

export const BottomSheedIcon = styled(MdDragHandle)`
  ${IconButton}
`;

export const Add = styled(MdAdd)`
  ${IconButton}
`;

export const MenuIcon = styled(IoMenu)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.gray.extraDark};
  }
`;

// Nav
export const NavItem = styled.div<StyledNavProps>`
  width: ${({ theme }) => theme.fontSize.xxlg};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.gray.medium};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const NavText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xsm};
`;

export const EmptySpace = styled.div`
  width: ${({ theme }) => theme.fontSize.lg}; // 아이콘 크기랑 동일
  height: ${({ theme }) => theme.fontSize.lg};
  visibility: hidden;
`;

export const HomeIcon = styled(HiOutlineHome)``;
export const SearchNavIcon = styled(IoSearch)``;
export const SignUpIcon = styled(IoPersonOutline)``;
export const SignInIcon = styled(LuKey)``;
export const FollowingIcon = styled(IoPeopleOutline)``;
