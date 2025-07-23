import { useSelector } from 'react-redux';
import { selectHistoryEntries } from '../../store/features/history/history.slice';
import { TransactionsList } from '../Home/components/TransactionsList';
import { Container } from '../../common/Container';

export const AllTransactions = () => {
  const fullHistoryData = useSelector(selectHistoryEntries);
  return (
    <Container>
      <TransactionsList data={fullHistoryData} />
    </Container>
  );
};
