<template>
    <div class="weather-item text-body1">
        <q-card
            :class="`my-card ${
                isDay ? 'sky-gradient-day' : 'sky-gradient-night'
            }`"
        >
            <q-card-section>
                <div class="text-bold">
                    {{ place.name }}, {{ place.sys.country }}
                </div>
                <div>
                    <div class="weather-item__top">
                        <div class="weather-item__img">
                            <img
                                :src="getImageUrl(place.weather[0].icon)"
                                alt=""
                            />
                        </div>
                        <div class="weather-item__temp">
                            {{ Math.round(place.main.temp) }} ℃
                        </div>
                    </div>
                    <div class="weather-item__bottom">
                        <div class="weather-item__temp-info">
                            Feels like
                            {{ Math.round(place.main.feels_like) }} ℃,
                            {{ place.weather[0].description }}
                        </div>
                        <div class="weather-item__bottom-items">
                            <div>
                                <q-icon name="near_me"> </q-icon>
                                {{ place.wind.speed }}m/s
                            </div>
                            <div>
                                <q-icon name="data_usage"> </q-icon>
                                {{ place.main.pressure }}hPa
                            </div>
                            <div>Humidity: {{ place.main.humidity }}%</div>
                            <div>
                                Visibility: {{ place.visibility / 1000 }}km
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
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
    computed: {
        isDay() {
            const { sunrise, sunset } = this.place.sys;
            const { dt } = this.place;
            return !(dt < sunrise || dt > sunset);
        },
    },
    methods: {
        getImageUrl(name: string): string {
            return `https://openweathermap.org/img/wn/${name}@2x.png`;
        },
    },
});
</script>

<style lang="scss" scoped>
.my-card {
    color: #fff;
    min-height: 265px;
}
.sky-gradient-day {
    background: linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%);
}
.sky-gradient-night {
    background: linear-gradient(to bottom, #020111 10%, #3a3a52 100%);
}
.weather-item {
    margin-bottom: 1rem;
    max-width: 320px;
    margin: auto;
    margin-bottom: 1rem;

    &__top {
        display: grid;
        grid-template-columns: 100px auto;
        align-items: center;
        gap: 20px;
    }

    &__temp-info {
        margin-bottom: 20px;
    }

    &__temp {
        font-size: 2.5rem;
        text-align: center;
        font-weight: 500;
    }

    &__bottom {
        font-weight: 500;
    }

    &__bottom-items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
}
</style>
