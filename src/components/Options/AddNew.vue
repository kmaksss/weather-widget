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
import { directGeocoding } from '../../api';
import { IPlace } from '../../interfaces';

export default {
    setup() {
        const options: { value: string[] } = ref([]);

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
        add(modelValue) {
            const places: IPlace[] = getStorageItem('places') || [];

            if (!places.find((place) => place.name === modelValue)) {
                const place = { id: '' + Date.now(), name: modelValue };
                places.unshift(place);
            }
            setStorageItem('places', places);
            (this as any).$emit('onAddPlace');
        },
    },
};
</script>
