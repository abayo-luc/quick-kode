import { ScreenContainer } from '../../common/Container';
import { HistoryCard } from '../../common/components/Card/HistoryCard';
import { FlatList, StyleSheet } from 'react-native';
import { ThemeSpacings } from '../../config/theme';
import { useSelector } from 'react-redux';
import { selectHistoryEntries } from '../../store/features/history/history.slice';
import { USS_HISTORY_ACTION_TITLE } from '../../common/helpers';

const styles = StyleSheet.create({
  flatListContent: {
    gap: ThemeSpacings.md,
  },
});

export const HistoryScreen = () => {
  const data = useSelector(selectHistoryEntries);

  const _renderItem = ({ item }: { item: IHistoryData }) => (
    <HistoryCard
      title={USS_HISTORY_ACTION_TITLE[item.action] || item.action}
      content={item.text}
    />
  );
  return (
    <ScreenContainer>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </ScreenContainer>
  );
};
