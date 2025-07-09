import {
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

export const MOMO_USSD_CODES = {
  SEND_MONEY: '*182*1*1*{phoneNumber}*{amount}#',
  PAY_GOOD_SERVICE: '*182*8*1#',
  CHECK_BALANCE: '*182*6*1#',
  BUY_AIRTIME: '*182*1*3#',
};

export const dialUSSD = async (ussdCode: string) => {
  if (Platform.OS === 'android') {
    console.log('Dialing USSD code:', ussdCode?.trim());
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      NativeModules.UssdModule.dialUssdCode(ussdCode);
    } else {
      throw new Error(
        'Permission to make phone calls denied. Please enable it in settings.',
      );
    }
  } else {
    Linking.openURL(`tel:${ussdCode.trim()}`);
  }
};

export const checkAccessibilityPermission = async () => {
  if (Platform.OS === 'android') {
    const isEnabled =
      await NativeModules.UssdModule.isAccessibilityServiceEnabled();
    console.log('Accessibility service enabled:', isEnabled);
    if (!isEnabled) {
      console.log('Accessibility service not enabled');
      // Optionally open settings
      NativeModules.UssdModule.openAccessibilitySettings();
    }
  }
};
