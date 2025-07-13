import { getProviderFromPhone, removeCountryCode } from './phone.helpers';
import { generateCustomUUID } from './utils';

export const MOMO_USSD_CODES: Record<IHistoryData['action'], string> = {
  SEND_MONEY: '*182*1*1*{phoneNumber}*{amount}#',
  PAY_GOOD_SERVICE: '*182*8*1#',
  CHECK_BALANCE: '*182*6*1#',
  BUY_AIRTIME: '*182*1*3#',
};

export const USS_HISTORY_ACTION_TITLE: Partial<
  Record<IHistoryData['action'], string>
> = {
  SEND_MONEY: 'Send Money',
  PAY_GOOD_SERVICE: 'Pay Good Service',
  BUY_AIRTIME: 'Buy Airtime',
};

export const extractMomoUSSDData = (
  text: string,
  action: IHistoryData['action'] | null,
) => {
  const extractedData: IMomoExtractedData = {
    balance: null,
  };
  if (
    action === 'CHECK_BALANCE' &&
    (text.startsWith('Musigaranye aya mafaranga') ||
      text.startsWith('Your balance is'))
  ) {
    const regex = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?\s?RWF)/i;
    const match = text.match(regex);
    extractedData.balance = match
      ? match[1].replace(/,/g, '').replace(/RWF/, '')
      : null;

    /**
     * TODO:
     * - cover for english
     * - cover for other lines (Airtel)
     */
  } else if (action === 'SEND_MONEY' && text.startsWith('Washyizeho:')) {
    const [_, name, phoneNumber, amount, fees] =
      text.match(/Washyizeho:\s(.+?),\s(\d+),\s(\d+)\sRwf.*?Rwf\s(\d+)/) || [];

    const transactionData: Partial<IHistoryData['transaction']> = {
      name: name || undefined,
      amount: amount || undefined,
      fees: fees || null,
      phoneNumber: phoneNumber || undefined,
    };
    if (
      Object.values(transactionData).some(
        value => value !== undefined && value !== null,
      )
    ) {
      extractedData['send'] = {
        id: generateCustomUUID(),
        action: 'SEND_MONEY',
        text: text,
        timestamp: Date.now(),
        transaction: {
          ...transactionData,
          provider: getProviderFromPhone(phoneNumber),
          status: 'completed',
        },
      };
    }
  }
  return extractedData;
};
