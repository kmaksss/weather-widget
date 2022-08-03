<template>
    <div class="options">
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div v-show="!isLoading">
                <Place :place="place" v-for="place in places" :key="place.id" />
            </div>
        </transition>
        <div v-if="!places.length && !isLoading">
            <p>Empty list</p>
            <a href="#" @click.prevent="$emit('onShowMenu')">add cities</a>
        </div>

        <q-inner-loading
            :showing="isLoading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
        />
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
        isLoading: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
});
</script>
