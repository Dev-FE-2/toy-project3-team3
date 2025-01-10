import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';
import { API_BASE_PATH } from '@/constants/endpoint';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('❌Supabase 환경 변수를 확인해주세요.');
}

export const supabaseRest = axios.create({
  baseURL: `${SUPABASE_URL}${API_BASE_PATH}`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
