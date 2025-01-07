import {
  Backward,
  EditContents,
  EditPlayList,
  EditThumbnail,
} from '@/components';

const PlayListEditPage = () => {
  return (
    <>
      <Backward />
      <EditThumbnail />
      <EditContents />
      <EditPlayList />
    </>
  );
};

export default PlayListEditPage;
