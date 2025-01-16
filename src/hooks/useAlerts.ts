import { useFetchDataByOneId } from './useSupabaseCrud';
import { supabase } from '@/apis/supabase';
import { Database } from '@/types';
import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import useErrorHandler from './useErrorHandler';
import { useMutation } from '@tanstack/react-query';

const { ALERTS } = API_ENDPOINTS;
const alertsQueryKey = QUERY_KEYS.ALERTS;

export const useFetchAlerts = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['ALERTS']['Row']>(
    [alertsQueryKey, userId],
    ALERTS.BY_TO_USER_ID,
    userId,
  );

export const useFetchNotCheckedAlerts = (userId?: string) => {
  const result = useFetchDataByOneId<
    Database['public']['Tables']['ALERTS']['Row']
  >(
    [alertsQueryKey, userId || ''],
    ALERTS.BY_TO_USER_ID_NOT_CHECKED,
    userId || '',
  );

  return result.data?.length === 0 ? { data: [], isLoading: false } : result;
};

export const useUpdateAlertsCheckedByUserId = () => {
  const handleError = useErrorHandler();

  const { mutateAsync: updateAlertsChecked } = useMutation<
    Database['public']['Tables']['ALERTS']['Row'][] | null,
    Error,
    string
  >({
    mutationFn: async (userId?: string) => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('ALERTS')
        .update({ is_checked: true })
        .eq('to_user_id', userId);

      if (error) {
        throw error;
      }

      return data;
    },
    onError: (error) => handleError('알림 업데이트', error),
  });

  return updateAlertsChecked;
};
