import {ScreenContainer} from '../../common/Container';
import {Avatar, Text, Title} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import globalStyles from '../../common/styles/global.styles';
import {ThemeSpacings} from '../../config/theme';
import {formatRwandaPhone} from '../../common/helpers/phone.helpers';
import {QuickAction} from '../../common/components/QuickAction';
import {TransactionHistoryItem} from './components/TransactionHistoryItem';
import {dialUSSD} from '../../common/helpers';

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
  const handleSendMoney = () => {
    // Logic for sending money
    console.log('Send Money clicked');
    dialUSSD('*182*1*1#');
  };
  const handlePayGoodService = () => {};
  const handleCheckBalance = () => {};
  const handleBuyAirtime = () => {};

  const renderTransactionItem = ({item}: {item: ITransaction}) => {
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
        <Avatar.Image
          size={64}
          source={{
            uri: 'https://placehold.co/600x400/png',
          }}
        />
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
    </ScreenContainer>
  );
};
