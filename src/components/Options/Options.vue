<template>
    <div class="options">
        <header class="text-bold">{{ title }}</header>
        <Places v-if="places" :places="places" @onDeleteItem="getPlacesLocal" />
        <AddNew @onAddPlace="getPlacesLocal" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IPlace } from '../../interfaces';
import { getStorageItem } from '../../utils';
import Places from './Places.vue';
import AddNew from './AddNew.vue';

interface IData {
    places: IPlace[];
}

export default defineComponent({
    name: 'Options',
    data: (): IData => ({
        places: [],
    }),
    components: { Places, AddNew },
    props: {
        title: String as PropType<string>,
    },
    methods: {
        getPlacesLocal() {
            this.places = getStorageItem('places') || [];
        },
    },
    mounted() {
        this.getPlacesLocal();
    },
});
</script>
