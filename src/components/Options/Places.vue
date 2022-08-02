<template>
    <q-list bordered separator>
        <Place
            :place="place"
            :key="place.id"
            v-for="place of places"
            @onDelete="$emit('onDeleteItem')"
        />
    </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Place from './Place.vue';
import { IPlace } from '../../interfaces';

export default defineComponent({
    name: 'Options',
    components: { Place },
    props: {
        places: Array as PropType<IPlace[]>,
    },
});
</script>
