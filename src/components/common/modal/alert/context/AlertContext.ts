import { createContext } from 'react';
import { AlertContextType } from '@/types';

const AlertContext = createContext<AlertContextType | null>(null);

export default AlertContext;
