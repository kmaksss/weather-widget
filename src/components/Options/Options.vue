<template>
    <div class="options">
        <div class="top">
            <header class="text-bold header">{{ title }}</header>
            <Places
                v-if="places.length"
                :places="places"
                @onUpdate="onUpdatePlaces"
            />
            <p v-else>Empty list</p>
        </div>
        <AddNew @onAddPlace="onUpdatePlaces" />
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
    watch: {
        isShow(show) {
            show && this.getPlacesLocal();
        },
    },
    props: {
        title: String as PropType<string>,
        isShow: Boolean as PropType<boolean>,
    },
    methods: {
        getPlacesLocal() {
            this.places = getStorageItem('places') || [];
        },
        onUpdatePlaces() {
            this.getPlacesLocal();
            (this as any).$emit('onUpdate');
        },
    },
});
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 1rem;
}
</style>
