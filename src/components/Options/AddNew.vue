<template>
    <div>
        <div class="label">Add location</div>
        <q-select
            filled
            v-model="modelValue"
            use-input
            input-debounce="300"
            hide-dropdown-icon
            :options="options"
            @filter="filterFn"
            @update:model-value="add"
        >
            <template v-slot:append>
                <q-icon
                    class="cursor-pointer"
                    name="keyboard_return"
                    @click.stop.prevent="add"
                />
            </template>
        </q-select>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getStorageItem, setStorageItem } from '../../utils';
import { directGeocoding, getCurrentWeather } from '../../api';
import { IPlace } from '../../interfaces';
import { notify } from '../../utils';

export default {
    setup(_, { emit }): any {
        const options: { value: unknown[] } = ref([]);
        const modelValue = ref(null);
        return {
            modelValue,
            options,
            async filterFn(val, update) {
                if (val === '') {
                    update(() => {
                        options.value = [];
                    });
                    return;
                }

                try {
                    const { data } = await directGeocoding(val);

                    update(() => {
                        options.value = data.map((item) => item.name);
                    });
                } catch (e) {
                    notify({
                        message: e.response.data.message,
                        type: 'error',
                    });
                }
            },
            async add() {
                if (!modelValue.value) {
                    return notify({
                        message: 'Choose a city from the list',
                        type: 'warning',
                    });
                }
                const places: IPlace[] = getStorageItem('places') || [];

                if (!places.find((place) => place.name === modelValue.value)) {
                    try {
                        const { data } = await getCurrentWeather({
                            q: modelValue.value || '',
                        });
                        const place = {
                            id: data.id,
                            name: data.name,
                            lat: data.coord.lat,
                            lon: data.coord.lon,
                        };
                        places.unshift(place);
                        modelValue.value = null;

                        notify({
                            message: 'City ​​saved',
                            type: 'success',
                        });
                    } catch (e) {
                        notify({
                            message: e.response.data.message,
                            type: 'error',
                        });
                    }
                } else {
                    return notify({
                        message: 'This city is already on your list',
                        type: 'warning',
                    });
                }
                setStorageItem('places', places);
                emit('onAddPlace');
            },
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.label {
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 1rem;
}
</style>
