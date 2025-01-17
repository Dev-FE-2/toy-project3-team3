import * as S from './Icon.styles';
import { IconProps } from '@/types';
import { Avatar } from '@/components';
import { useAuth } from '@/hooks';

const Icon = ({ type, isActive = false, onClick }: IconProps) => {
  const { user } = useAuth();

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
      bottomSheet: '바텀시트 드래그',
      add: '추가',
      send: '메시지 발송',
      home: '홈으로 이동',
      searchNav: '검색으로 이동',
      signUp: '회원가입으로 이동',
      signIn: '로그인으로 이동',
      following: '팔로잉으로 이동',
      profile: '프로필로 이동',
      menu: '프로필 메뉴 보기',
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
    comment: isActive ? (
      <S.CommentIconFilled onClick={onClick} aria-label={getAriaLabel()} />
    ) : (
      <S.CommentIconEmpty onClick={onClick} aria-label={getAriaLabel()} />
    ),
    cancel: <S.CancleIcon onClick={onClick} aria-label={getAriaLabel()} />,
    backward: <S.BackwardIcon onClick={onClick} aria-label={getAriaLabel()} />,
    search: <S.SearchIcon onClick={onClick} aria-label={getAriaLabel()} />,
    drag: <S.DragIcon aria-label={getAriaLabel()} />,
    bottomSheet: <S.BottomSheedIcon aria-label={getAriaLabel()} />,
    add: <S.Add onClick={onClick} aria-label={getAriaLabel()} />,
    send: <S.Send onClick={onClick} aria-label={getAriaLabel()} />,
    // header
    alarm: (
      <S.AlarmIconWrapper>
        <S.AlarmIcon onClick={onClick} aria-label={getAriaLabel()} />
        {isActive && <S.AlarmDot aria-hidden="true" />}
      </S.AlarmIconWrapper>
    ),

    menu: <S.MenuIcon onClick={onClick} aria-label={getAriaLabel()} />,
    // nav
    home: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <S.HomeIcon />
        <S.NavText>홈</S.NavText>
      </S.NavItem>
    ),
    searchNav: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <S.SearchNavIcon />
        <S.NavText>검색</S.NavText>
      </S.NavItem>
    ),
    signUp: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <S.SignUpIcon />
        <S.NavText>회원가입</S.NavText>
      </S.NavItem>
    ),
    signIn: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <S.SignInIcon />
        <S.NavText>로그인</S.NavText>
      </S.NavItem>
    ),
    // 더미 아이콘
    plusBtnPos: (
      <S.NavItem $isActive={false} aria-hidden="true">
        <S.EmptySpace />
        <S.NavText>&nbsp;</S.NavText>
      </S.NavItem>
    ),
    following: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <S.FollowingIcon />
        <S.NavText>팔로잉</S.NavText>
      </S.NavItem>
    ),
    profile: (
      <S.NavItem
        onClick={onClick}
        $isActive={isActive}
        aria-label={getAriaLabel()}
      >
        <Avatar
          size="xsmall"
          imageUrl={user?.profileImage}
          altText={`${user?.nickname} 프로필`}
        />
        <S.NavText>프로필</S.NavText>
      </S.NavItem>
    ),
  };

  return iconMap[type];
};

export default Icon;

/**
 * 사용 예시
 * <Icon 
    type="alarm" 
    // isActive={hasNewAlarm} (좋아요, 구독, 알람 아이콘, nav에만 존재)
    // onClick={handleAlarmIconClick} 
  />
 */
