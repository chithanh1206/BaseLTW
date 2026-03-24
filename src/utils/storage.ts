export const getData = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

export const setData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};