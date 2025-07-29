import { Badge, List, Text, useTheme } from 'react-native-paper';
import { Icon, IconProps } from '../../../common/components/Icon';
import React from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../../common/styles/global.styles';
import { DEVICE_DIMENSIONS } from '../../../common/components/constants';
import { ThemeSpacings } from '../../../config/theme';

interface TransactionHistoryItemProps {
  type: IHistoryData['action'];
  title: string;
  description: string;
  rightUpText?: string;
  rightBottomText?: string;
}

type ItemExtraComponentProps = { color: string; style?: Style | undefined };
export const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  type,
  title,
  description,
  rightUpText,
  rightBottomText,
}) => {
  const theme = useTheme();
  const iconNames: Partial<Record<IHistoryData['action'], IconProps['name']>> =
    {
      SEND_MONEY: 'ArrowTopRight',
      PAY_GOOD_SERVICE: 'CreditScore',
      BUY_AIRTIME: 'PhonePause',
    };
  const renderIcon = (props: ItemExtraComponentProps) => {
    if (iconNames[type]) {
      return (
        <View
          style={[
            styles.iconContainer,

            {
              backgroundColor: theme.colors.primaryContainer,
              borderRadius: theme.roundness,
            },
          ]}
        >
          <Icon name={iconNames[type]} color={props.color} size={28} />
        </View>
      );
    }
    return null;
  };

  const renderRightContent = (props: ItemExtraComponentProps) => {
    if (rightUpText || rightBottomText) {
      return (
        <View style={[styles.rightContentContainer]}>
          {rightUpText && <Text variant="bodySmall">{rightUpText}</Text>}
          {rightBottomText && (
            <Badge selectionColor={props.color} size={20}>
              {rightBottomText}
            </Badge>
          )}
        </View>
      );
    }
    return null;
  };
  return (
    <List.Item
      title={<Text variant="titleSmall">{title}</Text>}
      description={props => (
        <Text variant="bodySmall" style={{ color: props.color }}>
          {description}
        </Text>
      )}
      left={renderIcon}
      right={renderRightContent}
      containerStyle={styles.containerStyle}
      style={globalStyles.removePadding}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    ...globalStyles.centered,
  },
  containerStyle: {
    ...globalStyles.centered,
    width: DEVICE_DIMENSIONS.width - ThemeSpacings.md * 2,
  },
  rightContentContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
