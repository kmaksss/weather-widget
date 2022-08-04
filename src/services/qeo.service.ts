import { IUserLocation } from '@/interfaces';

const locationManager = navigator.geolocation;

function _getErrorMessage({ code }: { code: number }): string {
    let errorMessage: string;
    switch (code) {
        case 1:
            errorMessage = 'You have denied access to your geolocation';
            break;
        case 3:
            errorMessage =
                'The location request was aborted because it took too long.';
            break;
        case 2:
            errorMessage = 'Location information is not available.';
            break;
        default:
            errorMessage = 'An unknown error has occurred';
    }
    return errorMessage;
}

export function getUserLocation(): Promise<IUserLocation> {
    return new Promise((resolve, reject) => {
        locationManager.getCurrentPosition(
            (position) => {
                const c = position.coords;

                resolve({
                    lat: c.latitude,
                    lon: c.longitude,
                });
            },
            (error) => {
                const errorMessage = _getErrorMessage(error);
                reject(errorMessage);
            }
        );
    });
}
