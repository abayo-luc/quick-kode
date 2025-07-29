import React, { useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import globalStyles from '../../../common/styles/global.styles';
import {
  getProviderFromPhone,
  removeCountryCode,
} from '../../../common/helpers/phone.helpers';
import { TransactionHistoryItem } from './TransactionHistoryItem';

import {
  formatDate,
  formatRelativeTime,
  formatTime,
  isToday,
} from '../../../common/helpers/date.helpers';
import { formatCurrency } from '../../../common/helpers/currency.helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactionLabels } from '../../../store/features/settings/settings.slice';
import { ThemeSpacings } from '../../../config/theme';
import { Icon } from '../../../common/components';
import { addLabelToTransaction } from '../../../store/features/history/history.slice';
import { to_snake_case } from '../../../common/helpers/utils';

interface TransactionsListProps {
  data: IHistoryData[];
  onViewAllPress?: () => void;
  title?: string;
}
export const TransactionsList: React.FC<TransactionsListProps> = ({
  data,
  onViewAllPress,
  title,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const transactionLabels = useSelector(selectTransactionLabels);
  const [showLabelDialog, setShowLabelDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IHistoryData | null>(null);

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
    const extraProps = { rightUpText: '' };
    if (!isToday(item.timestamp)) {
      extraProps['rightUpText'] = formatRelativeTime(item.timestamp);
    } else {
      extraProps['rightUpText'] = formatDate(item.timestamp);
    }
    return (
      <TouchableOpacity
        onLongPress={() => {
          setShowLabelDialog(true);
          setSelectedTransaction(item);
        }}
      >
        <TransactionHistoryItem
          type={item.action}
          title={formatCurrency(item.transaction?.amount || 0)}
          description={description}
          rightBottomText={item.label}
          {...extraProps}
        />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    if (title || onViewAllPress) {
      return (
        <View style={globalStyles.spacedRow}>
          {title && <Text variant="titleMedium">{title}</Text>}
          {onViewAllPress && (
            <Button
              mode="text"
              style={globalStyles.horizontalSpacing}
              onPress={onViewAllPress}
            >
              View All
            </Button>
          )}
        </View>
      );
    }
    return null;
  };

  const handleAddLabelToTransaction = (
    payload: Pick<IHistoryData, 'id' | 'label'>,
  ) => {
    dispatch(addLabelToTransaction(payload));
  };
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={[globalStyles.flatListContent, { gap: 0 }]}
        ListHeaderComponent={renderHeader}
      />
      <Portal>
        <Dialog
          visible={showLabelDialog}
          onDismiss={() => setShowLabelDialog(false)}
          style={{ borderRadius: theme.roundness }}
        >
          <Dialog.Content>
            <View style={[globalStyles.row, { gap: ThemeSpacings.md }]}>
              {Object.values(transactionLabels).map(label => {
                return (
                  <Chip
                    key={label.name}
                    icon={() =>
                      to_snake_case(selectedTransaction?.label || '') ===
                      to_snake_case(label.name) ? (
                        <Icon name="Check" color={theme.colors.primary} />
                      ) : null
                    }
                    onPress={() => {
                      if (selectedTransaction?.id) {
                        handleAddLabelToTransaction({
                          id: selectedTransaction.id,
                          label: label.name,
                        });
                      }
                      setShowLabelDialog(false);
                    }}
                  >
                    {label.name}
                  </Chip>
                );
              })}
            </View>
          </Dialog.Content>
          <Dialog.Actions style={[globalStyles.removePadding]}>
            <Button onPress={() => setShowLabelDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
