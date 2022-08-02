<template>
    <div class="weather-widget">
        <q-icon
            :name="showOptions ? 'close' : 'settings'"
            class="cursor-pointer settings"
            size="2rem"
            @click.stop="toggleSettingsPage"
        />
        <Options
            class="options-wrap"
            title="settings"
            :class="{ show: showOptions }"
        />
        <WeatherInfo :places="places" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCurrentWeather } from './api';
import Options from './components/Options/Options.vue';
import WeatherInfo from './components/WeatherInfo/WeatherInfo.vue';
import { IGetCurrentWeatherParams, IGetCurrentWeather } from './interfaces';
import { getStorageItem } from './utils';

interface IData {
    showOptions: boolean;
    places: IGetCurrentWeather[];
}

export default defineComponent({
    name: 'App',
    data: (): IData => ({
        showOptions: false,
        places: [],
    }),
    components: { Options, WeatherInfo },
    methods: {
        updatePlaces() {
            const places = getStorageItem('places');
            places && this.getAllWeather(places);
        },
        async getAllWeather(params: IGetCurrentWeatherParams[]) {
            this.resetPlaces();

            for (const item of params) {
                const { data } = await getCurrentWeather(item);
                this.places.push(data);
            }
        },
        toggleSettingsPage(): void {
            this.showOptions = !this.showOptions;
            !this.showOptions && this.updatePlaces();
        },
        resetPlaces() {
            this.places = [];
        },
    },
    created() {
        this.updatePlaces();
    },
});
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 101;
}

.options-wrap {
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: 100;
    transition: 0.3s ease-in-out;
    background: #ebebeb;
    border-radius: 50%;
    transform: translate(400px, -400px);

    &.show {
        width: 100%;
        height: 100%;
        border-radius: 0;
        transform: translate(0, 0);
    }
}
</style>
