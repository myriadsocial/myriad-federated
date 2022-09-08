export const formatAddress = (address: string) => {
  if (!address) return;
  if (address.length <= 14) return address;
  return address.substring(0, 5) + '...' + address.substring(address.length - 5);
};
