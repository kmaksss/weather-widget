<template>
    <div class="weather-item">
        <div class="text-bold">{{ place.name }}, {{ place.sys.country }}</div>
        <div class="q-pa-md">
            <div class="weather-item__top">
                <div class="weather-item__img">
                    <img :src="getImageUrl(place.weather[0].icon)" alt="" />
                </div>
                <div class="weather-item__temp">
                    {{ Math.round(place.main.temp) }} ℃
                </div>
            </div>
            <div class="weather-item__bottom">
                <div class="weather-item__temp-info">
                    Feels like {{ Math.round(place.main.feels_like) }} ℃,
                    {{ place.weather[0].description }},
                </div>
                <div class="weather-item__navigation">
                    {{ place.wind.speed }}m/s, deg {{ place.wind.deg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IGetCurrentWeather } from '../../interfaces';

export default defineComponent({
    name: 'WeatherPlace',
    props: {
        place: {
            type: Object as PropType<IGetCurrentWeather>,
            default: () => ({}),
        },
    },
    methods: {
        getImageUrl(name: string): string {
            return `https://openweathermap.org/img/wn/${name}@2x.png`;
        },
    },
});
</script>
