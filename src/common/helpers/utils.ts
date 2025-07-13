export const generateCustomUUID = () => {
  const timestamp = Date.now().toString(36); // base36 = numbers + letters
  const random = Math.random().toString(36).substring(2, 8); // 6 random chars
  return `id-${timestamp}-${random}`;
};
