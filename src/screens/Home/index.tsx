import React, { useMemo, useRef } from 'react';
import { ScreenContainer } from '../../common/Container';
import { Text } from 'react-native-paper';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import globalStyles from '../../common/styles/global.styles';
import { ThemeSpacings } from '../../config/theme';
import {
  getProviderFromPhone,
  removeCountryCode,
} from '../../common/helpers/phone.helpers';
import { TransactionHistoryItem } from './components/TransactionHistoryItem';
import { dialUSSD } from '../../common/helpers/ussd.helpers';
import { MOMO_USSD_CODES } from '../../common/helpers/ussd.momo.helper';
import { CustomBottomSheet } from '../../common/components/CustomBottomSheet';
import { SendMoneyForm } from './components/SendMoneyForm';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { StatCard } from '../../common/components/Card/StatCard';
import { HomeQuickActions } from './components/HomeQuickActions';
import { useUSSDEvent } from '../../common/hooks/useUSSDEvent';
import { formatCurrency } from '../../common/helpers/currency.helpers';
import { useSelector } from 'react-redux';
import { selectMoMoBalance } from '../../store/features/momo/momo.slice';
import {
  selectHistoryEntries,
  selectTransactionHistoryFees,
} from '../../store/features/history/history.slice';
import { PayGoodsForm } from './components/PayGoodsForm';
import {
  formatDate,
  formatRelativeTime,
  formatTime,
  isToday,
} from '../../common/helpers/date.helpers';

const styles = StyleSheet.create({
  headerContainer: {
    ...globalStyles.row,
    gap: ThemeSpacings.lg,
    alignItems: 'center',
  },
  quickActionContainer: {
    ...globalStyles.row,
    gap: ThemeSpacings.md,
    flexWrap: 'wrap',
  },
  statSection: {
    ...globalStyles.row,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  flatListContent: {
    gap: ThemeSpacings.sm,
  },
});

type QuickActionType = keyof typeof MOMO_USSD_CODES;

export const HomeScreen = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const { loading, action, setAction } = useUSSDEvent();
  const [currentActionForm, setCurrentActionForm] =
    React.useState<QuickActionType>();

  const momoBalance = useSelector(selectMoMoBalance);
  const transactionFee = useSelector(selectTransactionHistoryFees);
  const historyData = useSelector(selectHistoryEntries);

  const handleDailUSSD = async (key: QuickActionType, ussdCode: string) => {
    setAction(key);
    return dialUSSD(ussdCode);
  };

  const onConfirmSendMoney = async (data: {
    amount?: string;
    receiver?: string;
    ussCodeKey: QuickActionType;
  }) => {
    try {
      if (data.ussCodeKey === 'SEND_MONEY' && data.amount && data.receiver) {
        const ussdCode = MOMO_USSD_CODES.SEND_MONEY.replace(
          '{phoneNumber}',
          data.receiver,
        ).replace('{amount}', data.amount);
        await handleDailUSSD('SEND_MONEY', ussdCode);
      } else if (
        data.ussCodeKey === 'PAY_GOOD_SERVICE' &&
        data.amount &&
        data.receiver
      ) {
        const ussdCode = MOMO_USSD_CODES.PAY_GOOD_SERVICE.replace(
          '{paymentCode}',
          data.receiver,
        ).replace('{amount}', data.amount);
        await handleDailUSSD('PAY_GOOD_SERVICE', ussdCode);
      } else {
        Alert.alert(
          'Invalid USSD Code',
          'Please provide a valid amount and phone number for sending money.',
        );
      }
    } catch (error) {
      console.error('Error dialing USSD code:', error);
    }
  };

  const handleCheckBalance = () =>
    handleDailUSSD('CHECK_BALANCE', MOMO_USSD_CODES.CHECK_BALANCE);
  const handleBuyAirtime = () =>
    handleDailUSSD('BUY_AIRTIME', MOMO_USSD_CODES.BUY_AIRTIME);

  const handleOpenQuickActionForm = async (actionType: QuickActionType) => {
    setCurrentActionForm(actionType);
    sheetRef.current?.present?.();
  };

  const renderTransactionItem = ({ item }: { item: IHistoryData }) => {
    const phoneNumber = removeCountryCode(item.transaction?.phoneNumber || '');

    let description: string = '';
    if (item.action === 'SEND_MONEY') {
      description = `Sent to ${item.transaction?.name}`;
      if (phoneNumber) {
        description += ` - ${removeCountryCode(phoneNumber)}`;
      }
    } else if (item.action === 'BUY_AIRTIME') {
      description = `Airtime purchase from ${
        getProviderFromPhone(phoneNumber) || 'Unknown'
      }`;
    } else if (item.action === 'PAY_GOOD_SERVICE') {
      description = `Paid to ${item.transaction?.name}, Code: ${item.transaction?.paymentCode}`;
    } else {
      description = '';
    }
    const extraProps = { rightUpText: '', rightBottomText: '' };
    if (!isToday(item.timestamp)) {
      extraProps['rightUpText'] = formatRelativeTime(item.timestamp);
    } else {
      extraProps['rightUpText'] = formatDate(item.timestamp);
      extraProps['rightBottomText'] = formatTime(item.timestamp, 'hh:mm A');
    }
    return (
      <TransactionHistoryItem
        type={item.action}
        title={formatCurrency(item.transaction?.amount || 0)}
        description={description}
        {...extraProps}
      />
    );
  };

  const renderBottomSheetContent = useMemo(() => {
    if (currentActionForm === 'SEND_MONEY') {
      return (
        <SendMoneyForm
          onCancel={dismiss}
          onConfirm={onConfirmSendMoney}
          loading={loading && action === 'SEND_MONEY'}
        />
      );
    }
    if (currentActionForm === 'PAY_GOOD_SERVICE') {
      return (
        <PayGoodsForm
          onCancel={dismiss}
          onConfirm={onConfirmSendMoney}
          loading={loading && action === 'PAY_GOOD_SERVICE'}
        />
      );
    }
    return null;
  }, [action, currentActionForm, loading]);
  return (
    <ScreenContainer>
      <View style={styles.statSection}>
        <StatCard
          title="Available Balance"
          value={formatCurrency(momoBalance)}
        />
        <StatCard
          title="Fees"
          value={formatCurrency(transactionFee)}
          style={{ width: '48%' }}
        />
      </View>
      <Text variant="titleMedium">Quick Actions</Text>
      <HomeQuickActions
        style={styles.quickActionContainer}
        handleBuyAirtime={handleBuyAirtime}
        handleCheckBalance={handleCheckBalance}
        handlePayGoodService={() =>
          handleOpenQuickActionForm('PAY_GOOD_SERVICE')
        }
        handleSendMoney={() => handleOpenQuickActionForm('SEND_MONEY')}
        currentCode={action}
        loading={loading}
      />

      <CustomBottomSheet ref={sheetRef}>
        {renderBottomSheetContent}
      </CustomBottomSheet>
      {historyData.length > 0 && (
        <>
          <Text variant="titleMedium">Recent History</Text>
          <FlatList
            data={historyData}
            keyExtractor={item => item.id}
            renderItem={renderTransactionItem}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </ScreenContainer>
  );
};
