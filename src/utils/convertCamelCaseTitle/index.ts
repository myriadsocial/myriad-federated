export const ConvertCamelCaseTitle = (title: string) => {
  const text = title ?? 'title';
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
