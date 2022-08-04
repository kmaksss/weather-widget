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
            title="Settings"
            :isShow="showOptions"
            @onUpdate="updatePlaces"
            :class="{ show: showOptions }"
        />
        <WeatherInfo
            :places="places"
            :isLoading="isLoading"
            @onShowMenu="toggleSettingsPage"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCurrentWeather } from './api';
import Options from './components/Options/Options.vue';
import WeatherInfo from './components/WeatherInfo/WeatherInfo.vue';
import {
    IGetCurrentWeatherParams,
    IGetCurrentWeather,
    IUserLocation,
    IPlace,
} from './interfaces';
import { getStorageItem, setStorageItem } from './utils';
import { getUserLocation } from './services/qeo.service';
import { notify } from './utils';

interface IData {
    showOptions: boolean;
    places: IGetCurrentWeather[];
    isLoading: boolean;
}

export default defineComponent({
    name: 'App',
    data: (): IData => ({
        isLoading: false,
        showOptions: false,
        places: [],
    }),
    components: { Options, WeatherInfo },
    methods: {
        setLoading(val = false) {
            this.isLoading = val;
        },
        updatePlaces() {
            const places = getStorageItem('places');
            places && this.getAllWeather(places);
        },
        async getAllWeather(params: IGetCurrentWeatherParams[]) {
            this.resetPlaces();
            this.setLoading(true);
            try {
                for (const item of params) {
                    const { data } = await getCurrentWeather(item);
                    this.places.push(data);
                }
            } catch (e) {
                notify({ message: e.response.data.message, type: 'error' });
            } finally {
                this.setLoading(false);
            }
        },
        toggleSettingsPage(): void {
            this.showOptions = !this.showOptions;
        },
        resetPlaces() {
            this.places = [];
        },
    },
    async created() {
        let userLocation: IUserLocation | null = null;
        if (!getStorageItem('isSetLocation')) {
            try {
                userLocation = await getUserLocation();
            } catch (e) {
                notify({ message: e, type: 'warning' });
            } finally {
                setStorageItem('isSetLocation', true);
            }
            if (userLocation) {
                try {
                    const { data } = await getCurrentWeather({
                        lat: userLocation.lat,
                        lon: userLocation.lon,
                    });
                    const places: IPlace[] = getStorageItem('places') || [];
                    const place = {
                        id: data.id,
                        name: data.name,
                        lat: data.coord.lat,
                        lon: data.coord.lon,
                    };
                    places.unshift(place);
                    setStorageItem('places', places);
                } catch (e) {
                    notify({ message: e.response.data.message, type: 'error' });
                }
            }
        }
        this.updatePlaces();
    },
});
</script>

<style lang="scss">
body,
html {
    height: 100%;
}
#app {
    height: 100%;
    overflow: auto;
}
</style>

<style lang="scss" scoped>
.weather-widget {
    min-height: 100%;
    padding: 2rem 1rem;
}
.settings {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 101;
    padding: 1rem;
}

.options-wrap {
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    overflow: auto;
    z-index: 100;
    transition: 0.1s ease-in-out;
    background: #ebebeb;
    border-radius: 50%;
    transform: translate(400px, -400px);
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.show {
        width: 100%;
        height: 100%;
        border-radius: 0;
        transform: translate(0, 0);
    }
}
</style>
