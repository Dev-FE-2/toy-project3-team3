// import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
// import {
//   useCreateData,
//   useDeleteDataByTwoId,
//   useFetchDataAll,
//   useFetchDataByOneId,
//   useUpdateDataByTwoId,
// } from '@/hooks/useSupabaseCrud';
// import type { Database } from '@/types';

// const { SUBSCRIBES } = API_ENDPOINTS;
// const subscribesQueryKey = QUERY_KEYS.SUBSCRIBES;

// export const useFetchSubscribes = () =>
//   useFetchDataAll<Database['public']['Tables']['SUBSCRIBES']['Row']>(
//     [subscribesQueryKey],
//     SUBSCRIBES.BASE,
//   );

// export const useFetchSubscribeByUserId = (userId: string) =>
//   useFetchDataByOneId<Database['public']['Tables']['SUBSCRIBES']['Row']>(
//     [subscribesQueryKey, userId],
//     SUBSCRIBES.BY_USER_ID,
//     userId,
//   );

// export const useFetchSubscribeByPlaylistId = (playlistId: string) =>
//   useFetchDataByOneId<Database['public']['Tables']['SUBSCRIBES']['Row']>(
//     [subscribesQueryKey, playlistId],
//     SUBSCRIBES.BY_PLAYLIST_ID,
//     playlistId,
//   );

// export const useCreateSubscribe = () =>
//   useCreateData<'SUBSCRIBES'>([subscribesQueryKey], SUBSCRIBES.BASE);

// export const useUpdateSubscribeByIdAndUserId = () =>
//   useUpdateDataByTwoId<'SUBSCRIBES'>(
//     [subscribesQueryKey],
//     SUBSCRIBES.BY_ID_AND_USER_ID,
//   );

// export const useDeleteSubscribeByIdAndUserId = () =>
//   useDeleteDataByTwoId([subscribesQueryKey], SUBSCRIBES.BY_ID_AND_USER_ID);
