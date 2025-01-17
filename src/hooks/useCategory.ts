import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import { useFetchDataAll, useFetchDataByOneId } from '@/hooks/useSupabaseCrud';
import { Database } from '@/types';

const { CATEGORY } = API_ENDPOINTS;
const categoryQueryKey = QUERY_KEYS.CATEGORIES;

export const useFetchCategories = () =>
  useFetchDataAll<Database['public']['Tables']['CATEGORY']['Row']>(
    [categoryQueryKey],
    CATEGORY.BASE,
  );

export const useFetchCategoryById = (categoryId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['CATEGORY']['Row']>(
    [categoryQueryKey, categoryId],
    CATEGORY.BY_ID,
    categoryId,
  );

export const useFetchCategoryByCategoryNameEn = (
  categoryNameEn: string | null,
) =>
  useFetchDataByOneId<Database['public']['Tables']['CATEGORY']['Row']>(
    categoryNameEn
      ? [categoryQueryKey, categoryNameEn]
      : [categoryQueryKey, 'all'],
    CATEGORY.BY_CATEGORY_NAME_EN,
    categoryNameEn || '',
  );
