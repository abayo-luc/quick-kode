export const formatRwandaPhone = (phone?: string) => {
  if (!phone) return '';
  return phone.replace(/^(\+250|0)?(\d{3})(\d{3})(\d{3})$/, '+250 $2 $3 $4');
};
