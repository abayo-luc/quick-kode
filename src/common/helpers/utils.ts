export const generateCustomUUID = () => {
  const timestamp = Date.now().toString(36); // base36 = numbers + letters
  const random = Math.random().toString(36).substring(2, 8); // 6 random chars
  return `id-${timestamp}-${random}`;
};

export const to_snake_case = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert underscore before uppercase letters
    .replace(/[\s-]+/g, '_') // Replace spaces and hyphens with underscores
    .toLowerCase(); // Convert to lowercase
};
