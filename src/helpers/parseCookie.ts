export const parseCookie = (cookie?: string) => {
  try {
    const data = JSON.parse(cookie ?? '');
    return data?.currentAddress ?? '';
  } catch {
    return {};
  }
};
