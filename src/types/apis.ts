import { FILE_PATH } from '@/constants';

export type FilePath = (typeof FILE_PATH)[keyof typeof FILE_PATH];
