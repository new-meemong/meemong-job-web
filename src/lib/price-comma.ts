export const formatPriceWithCommas = (value: number | null): string => {
  if (value === null) return "";
  return new Intl.NumberFormat().format(value);
};
