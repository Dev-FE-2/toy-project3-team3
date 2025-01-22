import { useFetchDataAll } from './useSupabaseCrud';
import { Database } from '@/types';
import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';

const { ALERT_TYPES } = API_ENDPOINTS;
const alertTypesQueryKey = QUERY_KEYS.ALERT_TYPES;

export const useFetchAlertTypes = () =>
  useFetchDataAll<Database['public']['Tables']['ALERT_TYPES']['Row']>(
    [alertTypesQueryKey],
    ALERT_TYPES.BASE,
  );
