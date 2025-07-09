import React, { useEffect, useMemo, useRef } from 'react';
import { ScreenContainer } from '../../common/Container';
import { Avatar, Text, Title } from 'react-native-paper';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import globalStyles from '../../common/styles/global.styles';
import { ThemeSpacings } from '../../config/theme';
import { formatRwandaPhone } from '../../common/helpers/phone.helpers';
import { TransactionHistoryItem } from './components/TransactionHistoryItem';
import { dialUSSD } from '../../common/helpers';
import { MOMO_USSD_CODES } from '../../common/helpers/ussd.momo.helper';
import { CustomBottomSheet } from '../../common/components/CustomBottomSheet';
import { SendMoneyForm } from './components/SendMoneyForm';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { StatCard } from '../../common/components/Card/StatCard';
import { HomeQuickActions } from './components/HomeQuickActions';
import { useExtractUSSDData } from '../../common/hooks/useUSSDEvent';
import { formatCurrency } from '../../common/helpers/currency.helpers';

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
    width: '100%',
    gap: ThemeSpacings.md,
    flexWrap: 'wrap',
  },
});

const transactions: ITransaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 5000,
    recipientName: 'John Doe',
    recipientNumber: '+250789277275',
  },
  {
    id: '2',
    type: 'receive',
    amount: 25000,
    senderName: 'David',
    senderNumber: '+250789277276',
  },
  {
    id: '3',
    type: 'buy-airtime',
    amount: 100,
    provider: 'MTN Rwanda',
  },
];
export const HomeScreen = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const { data, loading, action, setAction } = useExtractUSSDData();

  const handleDailUSSD = async (
    key: keyof typeof MOMO_USSD_CODES,
    ussdCode: string,
  ) => {
    setAction(key);
    return dialUSSD(ussdCode);
  };
  const onConfirmSendMoney = async (data: {
    amount?: string;
    phoneNumber?: string;
    ussCodeKey: keyof typeof MOMO_USSD_CODES;
  }) => {
    try {
      if (data.ussCodeKey === 'SEND_MONEY' && data.amount && data.phoneNumber) {
        const ussdCode = MOMO_USSD_CODES.SEND_MONEY.replace(
          '{phoneNumber}',
          data.phoneNumber,
        ).replace('{amount}', data.amount);
        await handleDailUSSD('SEND_MONEY', ussdCode);
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

  const handleSendMoney = async () => {
    sheetRef.current?.present();
  };

  const handlePayGoodService = () =>
    handleDailUSSD('PAY_GOOD_SERVICE', MOMO_USSD_CODES.PAY_GOOD_SERVICE);
  const handleCheckBalance = () =>
    handleDailUSSD('CHECK_BALANCE', MOMO_USSD_CODES.CHECK_BALANCE);
  const handleBuyAirtime = () =>
    handleDailUSSD('BUY_AIRTIME', MOMO_USSD_CODES.BUY_AIRTIME);

  const renderTransactionItem = ({ item }: { item: ITransaction }) => {
    const thirdPartPhone = formatRwandaPhone(
      item.recipientNumber || item.senderNumber,
    );
    const thirdPartName =
      item.recipientName || item.senderName || thirdPartPhone;
    let description: string = '';
    if (item.type === 'send') {
      description = `Sent to ${thirdPartName}`;
    } else if (item.type === 'receive') {
      description = `Received from ${thirdPartName}`;
    } else if (item.type === 'buy-airtime') {
      description = `Airtime purchase from ${item.provider || 'Unknown'}`;
    } else {
      description = '';
    }
    return (
      <TransactionHistoryItem
        type={item.type}
        title={`RWF ${item.amount}`}
        description={description}
      />
    );
  };
  const keyExtractor = (item: ITransaction) => item.id;

  return (
    <ScreenContainer>
      <View style={styles.statSection}>
        <StatCard
          title="Available balance"
          value={`Rwf ${formatCurrency(data?.balance)}`}
        />
        <StatCard title="Fees" value="Rwf ---" />
      </View>
      <Title>Quick Actions</Title>
      <HomeQuickActions
        style={styles.quickActionContainer}
        handleBuyAirtime={handleBuyAirtime}
        handleCheckBalance={handleCheckBalance}
        handlePayGoodService={handlePayGoodService}
        handleSendMoney={handleSendMoney}
        currentCode={action}
        loading={loading}
      />

      <CustomBottomSheet ref={sheetRef}>
        <SendMoneyForm
          onCancel={dismiss}
          onConfirm={onConfirmSendMoney}
          loading={loading && action === 'SEND_MONEY'}
        />
      </CustomBottomSheet>
    </ScreenContainer>
  );
};
