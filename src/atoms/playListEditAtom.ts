import { atom } from 'jotai';
import type { EditMode } from '@/types';

export const editModeAtom = atom<EditMode>('add');
