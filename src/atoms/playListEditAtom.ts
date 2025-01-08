import { atom } from 'jotai';
import { Video, type EditMode } from '@/types';
// import { atomWithStorage } from 'jotai/utils';

export const editModeAtom = atom<EditMode>('add');

export const playListAtom = atom<Video[]>([]);

export const hashtagAtom = atom<string[]>([]);
