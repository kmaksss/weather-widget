<template>
    <q-select
        filled
        v-model="modelValue"
        use-input
        input-debounce="300"
        label="Add location"
        hide-dropdown-icon
        :options="options"
        @filter="filterFn"
    >
        <template v-slot:append>
            <q-icon
                class="cursor-pointer"
                name="keyboard_return"
                @click.stop.prevent="modelValue && add(modelValue)"
            />
        </template>
    </q-select>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getStorageItem, setStorageItem } from '../../utils';
import { directGeocoding, getCurrentWeather } from '../../api';
import { IPlace } from '../../interfaces';

export default {
    setup() {
        const options: { value: any[] } = ref([]);

        return {
            modelValue: ref(null),
            options,
            async filterFn(val, update) {
                if (val === '') {
                    update(() => {
                        options.value = [];
                    });
                    return;
                }

                const { data } = await directGeocoding(val);

                update(() => {
                    options.value = data.map((item) => item.name);
                });
            },
        };
    },
    methods: {
        async add(modelValue) {
            const places: IPlace[] = getStorageItem('places') || [];

            if (!places.find((place) => place.name === modelValue)) {
                const { data } = await getCurrentWeather({ q: modelValue });
                const place = {
                    id: data.id,
                    name: data.name,
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                };
                places.unshift(place);
            }
            setStorageItem('places', places);
            (this as any).$emit('onAddPlace');
        },
    },
};
</script>
