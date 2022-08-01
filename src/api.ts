import axios from 'axios'
import { IGetCurrentWeatherParams } from './interfaces'

const { VUE_APP_OPENWEATHERMAP_URL, VUE_APP_OPENWEATHERMAP_API_KEY } =
    process.env

export const getCurrentWeather = (
    params: IGetCurrentWeatherParams
): Promise<Record<string, unknown>> => {
    params = {
        ...params,
        lang: 'ru',
        appid: VUE_APP_OPENWEATHERMAP_API_KEY,
    }

    return axios.get(`${VUE_APP_OPENWEATHERMAP_URL}/data/2.5/weather`, {
        params,
    })
}
