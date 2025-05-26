export const formatRwandaPhone = (phone?: string) => {
  if (!phone) return '';
  return phone.replace(/^(\+250|0)?(\d{3})(\d{3})(\d{3})$/, '+250 $2 $3 $4');
};

export const removeCountryCode = (phone?: string) => {
  if (!phone) return '';
  // Remove country code
  let cleaned = phone.replace(/^(\+25)/, '');
  // Remove '-', '(', ')', and spaces
  cleaned = cleaned.replace(/[-()\s]/g, '');
  return cleaned;
};
