import * as S from './Icon.styles';
import { IconProps } from '@/types';

const Icon = ({ type, isActive = false, onClick }: IconProps) => {
  const getAriaLabel = () => {
    const labels = {
      like: `${isActive ? '좋아요 취소' : '좋아요'}`,
      subscribe: `${isActive ? '구독 취소' : '구독하기'}`,
      alarm: `${isActive ? '새 알림 있음' : '새 알림 없음'}`,
      comment: '댓글',
      cancel: '취소',
      backward: '뒤로 가기',
      search: '검색',
      drag: '드래그',
    };
    return labels[type];
  };
  const iconMap = {
    like: isActive ? (
      <S.HeartIconFilled onClick={onClick} aria-label={getAriaLabel()} />
    ) : (
      <S.HeartIconEmpty onClick={onClick} aria-label={getAriaLabel()} />
    ),
    subscribe: isActive ? (
      <S.SubscribeFilled onClick={onClick} aria-label={getAriaLabel()} />
    ) : (
      <S.SubscribeEmpty onClick={onClick} aria-label={getAriaLabel()} />
    ),
    alarm: (
      <S.AlarmIconWrapper>
        <S.AlarmIcon onClick={onClick} aria-label={getAriaLabel()} />
        {isActive && <S.AlarmDot aria-hidden="true" />}
      </S.AlarmIconWrapper>
    ),
    comment: <S.CommentIcon onClick={onClick} aria-label={getAriaLabel()} />,
    cancel: <S.CancleIcon onClick={onClick} aria-label={getAriaLabel()} />,
    backward: <S.BackwardIcon onClick={onClick} aria-label={getAriaLabel()} />,
    search: <S.SearchIcon onClick={onClick} aria-label={getAriaLabel()} />,
    drag: <S.DragIcon aria-label={getAriaLabel()} />,
  };

  return iconMap[type];
};

export default Icon;

/**
 * 사용 예시
 * <Icon 
    type="alarm" 
    // isActive={hasNewAlarm} (좋아요, 구독, 알람 아이콘에만 존재)
    // onClick={handleAlarmIconClick} 
  />
 */
