export const formatCurrency = (amount: number | string | null): string => {
  if (!amount || isNaN(parseFloat(amount as string))) {
    return '---';
  }
  return parseFloat(amount as string).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: 'RWF',
    style: 'currency',
  });
};
