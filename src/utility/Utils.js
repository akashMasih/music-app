
export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const pinCodeRegExp = /^\d{6}$/;
export const aadhaarRegExp = /^\d{12}$/;
export const panRegExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;







export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const isEmptyArray = arr => {
  return (
    arr === undefined ||
    arr === null ||
    (Array.isArray(arr) && arr.length === 0)
  );
};

export const isBrowser = () => typeof window !== "undefined";



