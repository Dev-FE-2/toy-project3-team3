import styled from 'styled-components';
import { FormStyle } from '@/components';
import { Button } from '@/components';

export const EditProfileFormContainer = FormStyle.FormContainer;

export const EditProfileFormTitle = FormStyle.FormTitle;

export const EditProfileForm = FormStyle.Form;

export const ProfileImg = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  width: 150px;
  object-fit: contain;
  margin-bottom: calc(var(--space-medium) * -1);
`;

export const PictureInput = styled.input`
  display: none;
`;

export const ChangeImageButton = styled(Button)``;

export const { FormField, InputwithDuplicateBtn, FormInput } = FormStyle;

export const FormButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;
`;

export const CancleButton = styled(Button)`
  flex: 1;
`;
export const SubmitButton = styled(Button)`
  flex: 1;
`;

export const DeactivateAccountButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space.lg};
`;

// 계정 해지 확인 토스트
export const ToastDAContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
`;

export const ToastDABtnContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
`;

export const ToastDACancleBtn = styled(Button)``;

export const ToastDAAcceptBtn = styled(Button)``;
