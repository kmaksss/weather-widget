import { Notify } from 'quasar';

export const getStorageItem = (key: string): any => {
    const localplaces = localStorage.getItem(key);
    return localplaces && JSON.parse(localplaces);
};

export const setStorageItem = (key: string, item: any) => {
    localStorage.setItem(key, JSON.stringify(item));
};

export const notify = ({ message, type = 'success' }: INotify): void => {
    const getColor = (type: NotifyType) => {
        switch (type) {
            case 'error':
                return 'red';
            case 'success':
                return 'green';
            case 'warning':
                return 'orange';
            default:
                return;
        }
    };
    Notify.create({
        message,
        color: getColor(type),
        position: 'top',
    });
};

type NotifyType = 'error' | 'success' | 'warning';
interface INotify {
    message: string;
    type: NotifyType;
}
