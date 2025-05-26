import {List, useTheme} from 'react-native-paper';
import {Icon, IconProps} from '../../../common/components/Icon';
import React from 'react';
import {Style} from 'react-native-paper/lib/typescript/components/List/utils';
import {StyleSheet, View} from 'react-native';

interface TransactionHistoryItemProps {
  type: ITransaction['type'];
  title: string;
  description: string;
}

export const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  type,
  title,
  description,
}) => {
  const theme = useTheme();
  const iconNames: Record<ITransaction['type'], IconProps['name']> = {
    send: 'ArrowBottomRight',
    receive: 'ArrowTopRight',
    'buy-airtime': 'PhoneSync',
  };
  const renderIcon = (props: {color: string; style: Style}) => {
    if (iconNames[type]) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.outline,
              borderRadius: theme.roundness,
            },
          ]}>
          <Icon name={iconNames[type]} color={props.color} size={30} />
        </View>
      );
    }
    return null;
  };
  return (
    <List.Item
      title={title}
      description={description}
      left={renderIcon}
      style={styles.listItem}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
  },
  listItem: {},
});
