<template>
    <div class="options">
        <Place :place="place" v-for="place in places" :key="place.id" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IGetCurrentWeather } from '../../interfaces';
import Place from './Place.vue';

export default defineComponent({
    name: 'WeatherInfo',
    components: { Place },
    props: {
        places: {
            type: Array as PropType<IGetCurrentWeather[]>,
            default: () => [],
        },
    },
});
</script>
