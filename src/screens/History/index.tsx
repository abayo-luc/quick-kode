import { HistoryCard } from '../../common/components/Card/HistoryCard';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectHistoryEntries } from '../../store/features/history/history.slice';
import { USS_HISTORY_ACTION_TITLE } from '../../common/helpers';
import globalStyles from '../../common/styles/global.styles';

export const HistoryScreen = () => {
  const data = useSelector(selectHistoryEntries);

  const _renderItem = ({ item }: { item: IHistoryData }) => (
    <HistoryCard
      title={USS_HISTORY_ACTION_TITLE[item.action] || item.action}
      content={item.text}
    />
  );
  return (
    <FlatList
      data={[...data, ...data, ...data, ...data].map((item, index) => ({
        ...item,
        id: `${item.id}-${index}`,
      }))}
      renderItem={_renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={globalStyles.flatListContent}
    />
  );
};
