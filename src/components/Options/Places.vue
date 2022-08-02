<template>
    <q-list bordered separator>
        <draggable
            class="dragArea list-group w-full"
            :list="places"
            @change="sortable"
        >
            <Place
                :place="place"
                :key="place.id"
                v-for="place of places"
                @onDelete="$emit('onUpdate')"
            />
        </draggable>
    </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { ISortable } from '../../interfaces';
import Place from './Place.vue';
import { IPlace } from '../../interfaces';
import { getStorageItem, setStorageItem } from '../../utils';

export default defineComponent({
    name: 'Options',
    components: {
        Place,
        Draggable: VueDraggableNext,
    },
    props: {
        places: Array as PropType<IPlace[]>,
    },
    methods: {
        sortable({ moved }: { moved: ISortable }) {
            let places: IPlace[] = getStorageItem('places');
            places = places.filter((place) => place.id !== moved.element.id);
            places.splice(moved.newIndex, 0, { ...moved.element });
            setStorageItem('places', places);
            (this as any).$emit('onUpdate');
        },
    },
});
</script>
