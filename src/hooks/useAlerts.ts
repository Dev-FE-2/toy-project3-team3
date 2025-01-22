import { useCreateData, useFetchDataByOneId } from './useSupabaseCrud';
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
export const useCreateAlerts = () =>
  useCreateData<'ALERTS'>([alertsQueryKey], ALERTS.BASE);
/* 
  사용법

  const test = (from_user_id: string, alert_type: AlertType) => {
    const getAlertTypeId = async (alert_type: string) => {
      const { data, error } = await supabase
          .from('ALERT_TYPES')
          .select('*')
          .eq('alert_type', alert_type)
          .single()
      
        if (error) throw error;
        return data.alert_type_id;
    }

    const createAlert = async (from_user_id: string, alert_type: string) => {
      try {
        const alert_type_id = await getAlertTypeId(alert_type); // alert_type_id 가져오기
  
        await createAlerts.mutateAsync({
          to_user_id: user?.userId || '', // 현재 사용자 ID
          from_user_id: from_user_id,
          alert_type_id: alert_type_id, // 가져온 alert_type_id 사용
        });
  
        console.log('Alert created successfully');
      } catch (error) {
        console.error('Failed to create alert:', error);
      }
    };

    createAlert(from_user_id, alert_type);
  }

  type AlertType = (typeof ALERTS_TYPE_KEYS)[number];
  const createAlerts = useCreateAlerts();

  <button onClick={() => test(from_user_id, 'followed')}>test</button>

*/
