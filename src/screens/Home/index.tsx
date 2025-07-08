import React, { useRef } from 'react';
import { ScreenContainer } from '../../common/Container';
import { Avatar, Text, Title } from 'react-native-paper';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import globalStyles from '../../common/styles/global.styles';
import { ThemeSpacings } from '../../config/theme';
import { formatRwandaPhone } from '../../common/helpers/phone.helpers';
import { QuickAction } from '../../common/components/QuickAction';
import { TransactionHistoryItem } from './components/TransactionHistoryItem';
import { dialUSSD, MOMO_USSD_CODES } from '../../common/helpers';
import {
  CustomBottomSheet,
  CustomBottomSheetHandles,
} from '../../common/components/CustomBottomSheet';
import { SendMoneyForm } from './components/SendMoneyForm';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';

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
  const handleDailUSSD = async (data: {
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
        await dialUSSD(ussdCode);
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

    // handleDailUSSD(MOMO_USSD_CODES.SEND_MONEY);
  };

  const handlePayGoodService = () => dialUSSD(MOMO_USSD_CODES.PAY_GOOD_SERVICE);
  const handleCheckBalance = () => dialUSSD(MOMO_USSD_CODES.CHECK_BALANCE);
  const handleBuyAirtime = () => dialUSSD(MOMO_USSD_CODES.BUY_AIRTIME);

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
      <View style={styles.headerContainer}>
        <Avatar.Text size={52} label="AJ" />
        <View>
          <Title>Jean Luc Abayo</Title>
          <Text variant="labelMedium">
            {formatRwandaPhone('+250789277275')}
          </Text>
        </View>
      </View>
      <Title>Quick Actions</Title>

      <View style={styles.quickActionContainer}>
        <QuickAction icon="ArrowTopRight" onPress={handleSendMoney}>
          Send
        </QuickAction>
        <QuickAction icon="HandExtended" onPress={handlePayGoodService}>
          Pay Good/Service
        </QuickAction>
        <QuickAction icon="Wallet" onPress={handleCheckBalance}>
          Check Balance
        </QuickAction>
        <QuickAction icon="PhoneSync" onPress={handleBuyAirtime}>
          Buy Airtime
        </QuickAction>
      </View>
      <Title>Recent Transactions</Title>
      <View>
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <CustomBottomSheet ref={sheetRef}>
        <SendMoneyForm onCancel={dismiss} onConfirm={handleDailUSSD} />
      </CustomBottomSheet>
    </ScreenContainer>
  );
};
