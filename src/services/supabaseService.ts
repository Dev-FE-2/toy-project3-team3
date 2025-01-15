import { supabaseRest } from '@/apis/supabase';
import type {
  EndpointByOneId,
  EndpointByOneIds,
  EndpointByTwoId,
} from '@/types';

export const fetchDataAll = async <T>(endpoint: string): Promise<T[]> => {
  const response = await supabaseRest.get<T[]>(endpoint);

  return response.data;
};

export const fetchDataByOneId = async <T>(
  endpoint: EndpointByOneId,
  id: string,
): Promise<T[]> => {
  const response = await supabaseRest.get<T[]>(`${endpoint(id)}`);

  return response.data;
};

export const fetchDataByOneIds = async <T>(
  endpoint: EndpointByOneIds,
  ids: string[],
): Promise<T[]> => {
  const response = await supabaseRest.get<T[]>(`${endpoint(ids)}`);

  return response.data;
};

export const fetchDataByTwoId = async <T>(
  endpoint: EndpointByTwoId,
  firstId: string,
  secondId: string,
): Promise<T[]> => {
  const response = await supabaseRest.get<T[]>(
    `${endpoint(firstId, secondId)}`,
  );

  return response.data;
};

export const fetchDataLengthByOneId = async <T extends { length: number }>(
  endpoint: EndpointByOneId,
  id: string,
): Promise<number> => {
  const response = await supabaseRest.get<T[]>(`${endpoint(id)}`);

  return response.data.length;
};

export const fetchDataLengthByTwoId = async <T extends { length: number }>(
  endpoint: EndpointByTwoId,
  firstId: string,
  secondId: string,
): Promise<number> => {
  const response = await supabaseRest.get<T[]>(
    `${endpoint(firstId, secondId)}`,
  );

  return response.data.length;
};

export const createData = async <T>(
  endpoint: string,
  payload: T,
): Promise<T[]> => {
  const response = await supabaseRest.post<T[]>(endpoint, payload, {
    headers: {
      Prefer: 'return=representation',
    },
  });

  return response.data;
};

export const updateDataByOneId = async <T>(
  endpoint: EndpointByOneId,
  id: string,
  payload: Partial<T>,
): Promise<T> => {
  const response = await supabaseRest.patch<T>(`${endpoint(id)}`, payload);

  return response.data;
};

export const updateDataByTwoId = async <T>(
  endpoint: EndpointByTwoId,
  firstId: string,
  secondId: string,
  payload: Partial<T>,
): Promise<T> => {
  const response = await supabaseRest.patch<T>(
    `${endpoint(firstId, secondId)}`,
    payload,
  );

  return response.data;
};

export const removeDataByOneId = async (
  endpoint: EndpointByOneId,
  id: string,
): Promise<void> => {
  await supabaseRest.delete(`${endpoint(id)}`);
};

export const removeDataByTwoId = async (
  endpoint: EndpointByTwoId,
  firstId: string,
  secondId: string,
): Promise<void> => {
  await supabaseRest.delete(`${endpoint(firstId, secondId)}`);
};
