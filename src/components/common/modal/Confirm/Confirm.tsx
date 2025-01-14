import * as S from './Confirm.styles';
import { Button } from '@/components';
import { ConfirmProps } from '@/types';
import ModalPortal from '../ModalPortal/ModalPortal';

const Confirm = ({
  content,
  onClickLeftBtn,
  onClickRightBtn,
}: ConfirmProps) => {
  return (
    <ModalPortal blockClick={true}>
      <S.ConfirmContainer>
        <S.WarningIcon />
        <p>{content.text}</p>
        <S.BtnContainer>
          <Button
            color="secondary"
            borderType="square"
            size="small"
            onClick={onClickLeftBtn}
          >
            {content.leftBtn}
          </Button>
          <Button
            color="gray"
            borderType="square"
            size="small"
            onClick={onClickRightBtn}
          >
            {content.rightBtn}
          </Button>
        </S.BtnContainer>
      </S.ConfirmContainer>
    </ModalPortal>
  );
};

export default Confirm;
