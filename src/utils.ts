export const getStorageItem = (key: string): any => {
    const localplaces = localStorage.getItem(key);
    return localplaces && JSON.parse(localplaces);
};

export const setStorageItem = (key: string, item: any) => {
    localStorage.setItem(key, JSON.stringify(item));
};
