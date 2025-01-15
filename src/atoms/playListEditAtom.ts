import { atom } from 'jotai';
import { Video, type EditMode } from '@/types';

export const editModeAtom = atom<EditMode>('add');

export const playListAtom = atom<Video[]>([]);

export const playlistErrorAtom = atom<string>('');

export const hashtagAtom = atom<string[]>([]);
