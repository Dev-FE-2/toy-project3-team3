import { StyledBtn, StyledPlusBtn } from './Button.styles';
import { BtnProps } from '@/types';

export const Button = ({
  color = 'primary',
  borderType = 'square',
  size = 'medium',
  children,
  disabled,
  ...props
}: BtnProps) => {
  if (borderType === 'circle') {
    return <StyledPlusBtn disabled={disabled} {...props} />;
  }
  return (
    <StyledBtn
      $color={color}
      $borderType={borderType}
      $size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledBtn>
  );
};

export default Button;

/**
 * 사용 예시
 * <Button color="primary" borderType="round" size="small" disabled={false}>
    팔로우
  </Button>

  // circle 버튼
  <Button borderType="circle" disabled={false} />
 */
