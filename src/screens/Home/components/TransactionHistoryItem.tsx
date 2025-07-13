import { List, Text, useTheme } from 'react-native-paper';
import { Icon, IconProps } from '../../../common/components/Icon';
import React from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../../common/styles/global.styles';

interface TransactionHistoryItemProps {
  type: IHistoryData['action'];
  title: string;
  description: string;
}

export const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  type,
  title,
  description,
}) => {
  const theme = useTheme();
  const iconNames: Partial<Record<IHistoryData['action'], IconProps['name']>> =
    {
      SEND_MONEY: 'ArrowTopRight',
      // receive: 'ArrowTopRight',
      BUY_AIRTIME: 'PhonePause',
    };
  const renderIcon = (props: { color: string; style: Style }) => {
    if (iconNames[type]) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.outline,
              borderRadius: theme.roundness,
            },
          ]}
        >
          <Icon name={iconNames[type]} color={props.color} size={30} />
        </View>
      );
    }
    return null;
  };
  return (
    <List.Item
      title={<Text variant="titleSmall">{title}</Text>}
      description={<Text variant="bodySmall">{description}</Text>}
      left={renderIcon}
      containerStyle={styles.listItem}
      style={globalStyles.removePadding}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    height: 50,
    width: 50,
    ...globalStyles.centered,
  },
  listItem: {
    ...globalStyles.centered,
  },
});
