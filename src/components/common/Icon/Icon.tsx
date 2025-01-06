import * as S from './Icon.styles';
import { IconProps } from '@/types/common';

const Icon = ({ type, isActive = false, onClick }: IconProps) => {
  const iconMap = {
    like: isActive ? (
      <S.HeartIconFilled onClick={onClick} />
    ) : (
      <S.HeartIconEmpty onClick={onClick} />
    ),
    subscribe: isActive ? (
      <S.SubscribeFilled onClick={onClick} />
    ) : (
      <S.SubscribeEmpty onClick={onClick} />
    ),
    alarm: (
      <S.AlarmIconWrapper>
        <S.AlarmIcon onClick={onClick} />
        {isActive && <S.AlarmDot />}
      </S.AlarmIconWrapper>
    ),
    comment: <S.CommentIcon onClick={onClick} />,
    cancel: <S.CancleIcon onClick={onClick} />,
    backward: <S.BackwardIcon onClick={onClick} />,
    search: <S.SearchIcon onClick={onClick}></S.SearchIcon>,
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
