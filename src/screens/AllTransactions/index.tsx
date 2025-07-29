import { useSelector } from 'react-redux';
import { selectHistoryEntries } from '../../store/features/history/history.slice';
import { TransactionsList } from '../Home/components/TransactionsList';
import { Container } from '../../common/Container';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AllTransactions = () => {
  const fullHistoryData = useSelector(selectHistoryEntries);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Container>
        <TransactionsList data={fullHistoryData} />
      </Container>
    </SafeAreaView>
  );
};
