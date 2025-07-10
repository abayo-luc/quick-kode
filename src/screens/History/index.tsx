import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../common/Container';
import { HistoryCard } from '../../common/components/Card/HistoryCard';
import { FlatList, StyleSheet } from 'react-native';
import { ThemeSpacings } from '../../config/theme';

const history = [
  {
    id: '1',
    type: 'send',
    amount: 5000,
    recipientName: 'John Doe',
    recipientNumber: '+250789277275',
    title: 'MOMO: Money Transfter',
    message:
      'Wohereje 50 RWF kuri 250780699957. Usigaranye 43,613. Murakoze gukoresha MTN Mobile Money',
  },
  {
    id: '2',
    type: 'receive',
    amount: 25000,
    senderName: 'David',
    senderNumber: '+250789277276',
    title: 'MOMO: Money Transfter',
    message:
      'Wohereje 50 RWF kuri 250780699957. Usigaranye 43,613. Murakoze gukoresha MTN Mobile Money',
  },
  {
    id: '3',
    type: 'buy-airtime',
    amount: 100,
    provider: 'MTN Rwanda',
    title: 'MOMO: Money Transfter',
    message:
      'Wohereje 50 RWF kuri 250780699957. Usigaranye 43,613. Murakoze gukoresha MTN Mobile Money',
  },
];
const styles = StyleSheet.create({
  flatListContent: {
    gap: ThemeSpacings.md,
  },
});
export const HistoryScreen = () => {
  const renderItem = ({ item }: any) => (
    <HistoryCard title={item.title} content={item.message} />
  );
  return (
    <ScreenContainer>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </ScreenContainer>
  );
};
