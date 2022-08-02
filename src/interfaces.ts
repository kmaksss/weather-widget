export interface IDirectGeoItem {
    country: string
    lat: number
    local_names: Object
    lon: number
    name: string
    state: string
}

export interface IGetCurrentWeatherParams {
    lat: string
    lon: string
    mode?: string
    appid?: string
    units?: string
    lang?: string
}

export interface IPlace {
    name: string
    id: string
}
