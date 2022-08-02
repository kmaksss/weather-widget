import axios from 'axios';
import {
    IDirectGeoItem,
    IGetCurrentWeather,
    IGetCurrentWeatherParams,
    IGetCurrentWeatherParamsGeo,
} from './interfaces';

const { VUE_APP_OPENWEATHERMAP_URL, VUE_APP_OPENWEATHERMAP_API_KEY } =
    process.env;

export const getCurrentWeather = (
    params: IGetCurrentWeatherParams | IGetCurrentWeatherParamsGeo
) => {
    params = {
        ...params,
        appid: VUE_APP_OPENWEATHERMAP_API_KEY,
        units: 'metric',
    };

    return axios.get<IGetCurrentWeather>(
        `${VUE_APP_OPENWEATHERMAP_URL}/data/2.5/weather`,
        {
            params,
        }
    );
};

export const directGeocoding = (q: string) => {
    const params = {
        limit: 5,
        appid: VUE_APP_OPENWEATHERMAP_API_KEY,
        q,
    };
    return axios.get<IDirectGeoItem[]>(
        `${VUE_APP_OPENWEATHERMAP_URL}/geo/1.0/direct`,
        {
            params,
        }
    );
};
