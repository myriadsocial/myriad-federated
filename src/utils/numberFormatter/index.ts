export const numberFormatter = (number: number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};
