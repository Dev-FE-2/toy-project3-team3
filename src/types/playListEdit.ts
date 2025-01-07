import { EDIT_MODE } from '@/constants';

export type EditMode = (typeof EDIT_MODE)[keyof typeof EDIT_MODE];
