export const getData = (key: string): any[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

export const setData = (key: string, data: any[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};