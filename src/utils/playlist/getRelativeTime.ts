export const getRelativeTime = (createdAt: string): string => {
  const now = new Date();
  const writedAt = new Date(createdAt);
  const diffInMs = now.getTime() - writedAt.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths}달 전`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInSeconds > 0) {
    return `${diffInSeconds}초 전`;
  }
  return '방금';
};
