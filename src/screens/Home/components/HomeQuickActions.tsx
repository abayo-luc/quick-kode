import { StyleProp, View, ViewStyle } from 'react-native';
import { QuickAction } from '../../../common/components';
import { FC } from 'react';
import { MOMO_USSD_CODES } from '../../../common/helpers';

interface HomeQuickActionsProps {
  style: StyleProp<ViewStyle>;
  handleSendMoney: () => void;
  handlePayGoodService: () => void;
  handleCheckBalance: () => void;
  handleBuyAirtime: () => void;
  currentCode?: keyof typeof MOMO_USSD_CODES | null;
  loading?: boolean;
}
export const HomeQuickActions: FC<HomeQuickActionsProps> = ({
  style,
  handleCheckBalance,
  handlePayGoodService,
  handleSendMoney,
  handleBuyAirtime,
  currentCode,
  loading,
}) => {
  return (
    <View style={style}>
      <QuickAction
        icon="ArrowTopRight"
        onPress={handleSendMoney}
        loading={loading && currentCode === 'SEND_MONEY'}
        disabled={loading}
      >
        Send
      </QuickAction>
      <QuickAction
        icon="HandExtended"
        onPress={handlePayGoodService}
        loading={loading && currentCode === 'PAY_GOOD_SERVICE'}
        disabled={loading}
      >
        Pay Good/Service
      </QuickAction>
      <QuickAction
        icon="Wallet"
        onPress={handleCheckBalance}
        loading={loading && currentCode === 'CHECK_BALANCE'}
        disabled={loading}
      >
        Check Balance
      </QuickAction>
      <QuickAction
        icon="PhoneSync"
        onPress={handleBuyAirtime}
        loading={loading && currentCode === 'BUY_AIRTIME'}
        disabled={loading}
      >
        Buy Airtime
      </QuickAction>
    </View>
  );
};
