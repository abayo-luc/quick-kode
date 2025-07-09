export const MOMO_USSD_CODES = {
  SEND_MONEY: '*182*1*1*{phoneNumber}*{amount}#',
  PAY_GOOD_SERVICE: '*182*8*1#',
  CHECK_BALANCE: '*182*6*1#',
  BUY_AIRTIME: '*182*1*3#',
};

export const extractMomoUSSDData = (
  text: string,
  action: keyof typeof MOMO_USSD_CODES | null,
) => {
  const extractedData: IMomoExtractedData = {
    balance: null,
    send: null,
    fees: null,
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
  }
  return extractedData;
};
