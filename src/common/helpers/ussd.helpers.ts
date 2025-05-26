import {Linking} from 'react-native';

export const dialUSSD = (ussdCode: string) => {
  //let ussdCode = '*182*1*1*0789277275#';
  let encoded = encodeURIComponent(ussdCode);
  Linking.openURL(`tel:${encoded}`);
};
