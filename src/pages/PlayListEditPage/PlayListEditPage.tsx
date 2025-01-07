import * as S from './PlayListEditPage.styles';
import {
  Backward,
  EditContents,
  EditPlayList,
  EditThumbnail,
} from '@/components';

const PlayListEditPage = () => {
  return (
    <S.PlayListEditPageWrapper>
      <Backward />
      <EditThumbnail />
      <EditContents />
      <EditPlayList />
    </S.PlayListEditPageWrapper>
  );
};

export default PlayListEditPage;
