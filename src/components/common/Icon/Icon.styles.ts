import styled, { css } from 'styled-components';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { HiMiniBookmark } from 'react-icons/hi2';
import { HiOutlineBookmark } from 'react-icons/hi2';
import { IoArrowBack } from 'react-icons/io5';
import { FaRegCommentDots } from 'react-icons/fa';
import { GoBell } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import { IoCloseSharp } from 'react-icons/io5';

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

export const CommentIcon = styled(FaRegCommentDots)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.gray.extraDark};
  }
`;

export const SearchIcon = styled(IoSearch)`
  ${IconButton};
  &:hover {
    color: ${({ theme }) => theme.colors.gray.extraDark};
  }
`;

export const BackwardIcon = styled(IoArrowBack)`
  ${IconButton};
  color: #000;
`;

export const CancleIcon = styled(IoCloseSharp)`
  ${IconButton};
  color: ${({ theme }) => theme.colors.gray.extraDark};
`;

export const DragIcon = styled(RxDragHandleHorizontal)`
  ${IconButton}
`;
