export const getDataFromStorage = <Type>(
  key: string,
  is: (param: any) => param is Type
) => {
  const unsafeItems = JSON.parse(window.localStorage.getItem(key) ?? "[]");
  const items = (Array.isArray(unsafeItems) ? unsafeItems : []).filter(is);
  return items;
};
