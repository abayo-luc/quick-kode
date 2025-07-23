import React from 'react';
import { Button, Text } from 'react-native-paper';
import { FlatList, View } from 'react-native';
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
      extraProps['rightBottomText'] = formatTime(item.timestamp, 'hh:mm');
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
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderTransactionItem}
      contentContainerStyle={[globalStyles.flatListContent, { gap: 0 }]}
      ListHeaderComponent={renderHeader}
    />
  );
};
