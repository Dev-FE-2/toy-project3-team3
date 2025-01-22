import { useAuth } from '@/hooks';
import * as S from './AlertPage.styles';
import {
  useFetchNotCheckedAlerts,
  useUpdateAlertsCheckedByUserId,
} from '@/hooks/useAlerts';
import { Avatar, Backward } from '@/components';
import { useEffect, useState } from 'react';
import { Database } from '@/types';
import { useFetchAlertTypes } from '@/hooks/useAlertType';
import { useNavigate } from 'react-router-dom';

const AlertPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alertList, setAlertList] = useState<
    Database['public']['Tables']['ALERTS']['Row'][] | null
  >(null);
  const [alertTypeList, setAlertTypeList] = useState<Record<string, string>>(
    {},
  );

  const { data: alertData, isLoading: alertDataIsLoading } =
    useFetchNotCheckedAlerts(user?.userId);

  const updateAlertsCheckedByUserId = useUpdateAlertsCheckedByUserId(); // 훅 호출

  useEffect(() => {
    const handleUpdateAlerts = () => {
      const userId = user?.userId;

      if (!userId) {
        console.error('userId가 없습니다.');
        return;
      }

      try {
        updateAlertsCheckedByUserId(userId);
      } catch (error) {
        console.error('알림 업데이트 실패: ', error);
      }
    };
    if (!alertDataIsLoading && alertData) {
      // 데이터가 로드된 후 알림 상태 업데이트
      setAlertList(alertData);
      handleUpdateAlerts();
    }
  }, [alertDataIsLoading]);

  const { data: alertTypeData, isLoading: alertTypeDataIsLoading } =
    useFetchAlertTypes();

  useEffect(() => {
    if (!alertTypeDataIsLoading && alertTypeData) {
      // Alert_Type 데이터를 객체 형태로 변환하여 캐싱
      const alertTypeMap: Record<string, string> = {};
      alertTypeData.forEach((type) => {
        alertTypeMap[type.alert_type_id] = type.message;
      });
      setAlertTypeList(alertTypeMap);
    }
  }, [alertTypeDataIsLoading, alertTypeData]);

  const handleAvatarClick = (nickname: string) => {
    navigate(`/${nickname}`);
  };

  return (
    <S.AlertPageContainer>
      <Backward />
      {alertList?.map((alert) => (
        <S.SingleAlert key={alert.alert_id}>
          <Avatar
            size="small"
            imageUrl={
              typeof alert.from_user_id !== 'string' &&
              alert.from_user_id.profile_image !== null
                ? alert.from_user_id.profile_image
                : undefined
            }
            altText="User Profile"
            onClick={() =>
              handleAvatarClick(
                typeof alert.from_user_id !== 'string'
                  ? alert.from_user_id.nickname
                  : '',
              )
            }
          />
          <S.AlertText>
            {typeof alert.from_user_id !== 'string'
              ? alert.from_user_id.nickname
              : ''}
            {alertTypeList[alert.alert_type_id]}
          </S.AlertText>
        </S.SingleAlert>
      ))}
      {alertList?.length === 0 && (
        <S.NoAlertText>모든 알림을 확인하셨습니다.</S.NoAlertText>
      )}
    </S.AlertPageContainer>
  );
};

export default AlertPage;
