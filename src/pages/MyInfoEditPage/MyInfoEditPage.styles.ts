import styled from 'styled-components';
import { FormStyle } from '@/components';
import { Button } from '@/components';

export const EditProfileFormContainer = FormStyle.FormContainer;

export const EditProfileForm = FormStyle.Form;

export const ProfileImg = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  width: 150px;
  height: 150px;
  object-fit: fill;
  margin-bottom: calc(${({ theme }) => theme.space.md} * -1);
`;

export const PictureInput = styled.input`
  display: none;
`;

export const ChangeImageButton = styled(Button)``;

export const {
  FormField,
  InputwithDuplicateBtn,
  DuplicateCheckBtn,
  FormInput,
} = FormStyle;

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
