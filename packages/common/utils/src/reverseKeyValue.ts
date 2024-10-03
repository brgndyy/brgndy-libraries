export const reverseKeyValue = <Key extends string | number, Value extends string | number>(
  object: Record<Key, Value>,
): Record<Value, Key> => {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
};
