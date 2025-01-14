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

/** 사용 예시
 * const [showConfirm, setShowConfirm] = useState(false);
 * 
 * const handleConfirmLeftBtn = async () => {
    await deactivateAccount();
  };
 * 
 *  {showConfirm && (
      <Confirm
        content={{
          text: '회원 탈퇴 하시겠습니까?',
          leftBtn: '예',
          rightBtn: '아니오',
        }}
        onClickLeftBtn={handleConfirmLeftBtn}
        onClickRightBtn={() => setShowConfirm(false)}
      />
    )}
 */
