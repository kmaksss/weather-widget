<template>
    <q-item clickable v-ripple class="item">
        <q-item-section avatar>
            <q-icon name="menu" />
        </q-item-section>
        <q-item-section>
            <q-item-label lines="2">{{ place.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-icon
                name="delete"
                class="cursor-pointer"
                size="1.5rem"
                @click.stop="deletePlace"
            />
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getStorageItem, setStorageItem } from '../../utils';
import { IPlace } from '../../interfaces';

export default defineComponent({
    name: 'Options',
    props: {
        place: {
            type: Object as PropType<IPlace>,
            required: true,
        },
    },
    methods: {
        deletePlace() {
            const places: IPlace[] = getStorageItem('places') || [];
            setStorageItem(
                'places',
                places.filter((place) => place.id !== this.place.id)
            );

            (this as any).$emit('onDelete');
        },
    },
});
</script>

<style lang="scss" scoped>
.item {
    background: #fff;
}
</style>
