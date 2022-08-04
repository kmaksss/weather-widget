export interface IUserLocation {
    lat: number;
    lon: number;
}

export interface ISortable {
    element: IPlace;
    oldIndex: number;
    newIndex: number;
}

export interface IDirectGeoItem {
    country: string;
    lat: number;
    local_names: { en: string };
    lon: number;
    name: string;
    state: string;
}

export interface IGetCurrentWeatherParams {
    lat: number;
    lon: number;
    mode?: string;
    appid?: string;
    units?: string;
    lang?: string;
}

export interface IGetCurrentWeatherParamsGeo {
    q: string;
    mode?: string;
    appid?: string;
}

export interface IGetCurrentWeather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface IPlace {
    name: string;
    id: number;
    lat: number;
    lon: number;
}
