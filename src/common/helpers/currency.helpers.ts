export const formatCurrency = (amount: number | string): string => {
  if (isNaN(parseFloat(amount as string))) {
    return '';
  }
  return parseFloat(amount as string).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
