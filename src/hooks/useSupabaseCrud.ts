import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDataAll,
  fetchDataByOneId,
  fetchDataByTwoId,
  createData,
  updateDataByOneId,
  updateDataByTwoId,
  removeDataByOneId,
  removeDataByTwoId,
} from '@/services';
import type {
  Database,
  EndpointByOneId,
  EndpointByTwoId,
  TablesInsert,
  TablesUpdate,
} from '@/types';

export const useFetchDataAll = <T>(queryKey: string[], endpoint: string) => {
  return useQuery<T[]>({
    queryKey,
    queryFn: () => fetchDataAll<T>(endpoint),
  });
};

export const useFetchDataByOneId = <T>(
  queryKey: string[],
  endpoint: EndpointByOneId,
  id: string,
) => {
  return useQuery<T>({
    queryKey,
    queryFn: () => fetchDataByOneId<T>(endpoint, id),
  });
};

export const useFetchDataByTwoId = <T>(
  queryKey: string[],
  endpoint: EndpointByTwoId,
  firstId: string,
  secondId: string,
) => {
  return useQuery<T>({
    queryKey,
    queryFn: () => fetchDataByTwoId<T>(endpoint, firstId, secondId),
  });
};

export const useCreateData = <
  TableName extends keyof Database['public']['Tables'],
>(
  queryKey: string[],
  endpoint: string,
  options?: {
    onSuccess?: (
      data: TablesInsert<TableName>,
      variables?: TablesInsert<TableName>,
    ) => void;
    onError?: (error: Error, variables?: TablesInsert<TableName>) => void;
    onMutate?: (variables: TablesInsert<TableName>) => void;
    onSettled?: (
      data: TablesInsert<TableName> | undefined,
      error: Error | null,
      variables: TablesInsert<TableName>,
    ) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TablesInsert<TableName>) =>
      createData<TablesInsert<TableName>>(endpoint, payload),
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
};

export const useUpdateDataByOneId = <
  TableName extends keyof Database['public']['Tables'],
>(
  queryKey: string[],
  endpoint: EndpointByOneId,
  options?: {
    onSuccess?: (
      data: TablesUpdate<TableName>,
      variables?: { id: string; payload: TablesUpdate<TableName> },
    ) => void;
    onError?: (
      error: Error,
      variables?: { id: string; payload: TablesUpdate<TableName> },
    ) => void;
    onMutate?: (variables: {
      id: string;
      payload: TablesUpdate<TableName>;
    }) => void;
    onSettled?: (
      data: TablesUpdate<TableName> | undefined,
      error: Error | null,
      variables: { id: string; payload: TablesUpdate<TableName> },
    ) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TablesUpdate<TableName>;
    }) => updateDataByOneId<TablesUpdate<TableName>>(endpoint, id, payload),
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
};

export const useUpdateDataByTwoId = <
  TableName extends keyof Database['public']['Tables'],
>(
  queryKey: string[],
  endpoint: EndpointByTwoId,
  options?: {
    onSuccess?: (
      data: TablesUpdate<TableName>,
      variables?: {
        firstId: string;
        secondId: string;
        payload: TablesUpdate<TableName>;
      },
    ) => void;
    onError?: (
      error: Error,
      variables?: {
        firstId: string;
        secondId: string;
        payload: TablesUpdate<TableName>;
      },
    ) => void;
    onMutate?: (variables: {
      firstId: string;
      secondId: string;
      payload: TablesUpdate<TableName>;
    }) => void;
    onSettled?: (
      data: TablesUpdate<TableName> | undefined,
      error: Error | null,
      variables: {
        firstId: string;
        secondId: string;
        payload: TablesUpdate<TableName>;
      },
    ) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstId,
      secondId,
      payload,
    }: {
      firstId: string;
      secondId: string;
      payload: TablesUpdate<TableName>;
    }) =>
      updateDataByTwoId<TablesUpdate<TableName>>(
        endpoint,
        firstId,
        secondId,
        payload,
      ),
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
};

export const useDeleteDataByOneId = (
  queryKey: string[],
  endpoint: EndpointByOneId,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error, variables?: string) => void;
    onMutate?: (variables: string) => void;
    onSettled?: (
      data: void | undefined,
      error: Error | null,
      variables: string,
    ) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeDataByOneId(endpoint, id),
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
};

export const useDeleteDataByTwoId = (
  queryKey: string[],
  endpoint: EndpointByTwoId,
  options?: {
    onSuccess?: (
      data: void | undefined,
      variables?: { firstId: string; secondId: string },
    ) => void;
    onError?: (
      error: Error,
      variables?: { firstId: string; secondId: string },
    ) => void;
    onMutate?: (variables: { firstId: string; secondId: string }) => void;
    onSettled?: (
      data: void | undefined,
      error: Error | null,
      variables: { firstId: string; secondId: string },
    ) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstId,
      secondId,
    }: {
      firstId: string;
      secondId: string;
    }) => removeDataByTwoId(endpoint, firstId, secondId),
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
};
