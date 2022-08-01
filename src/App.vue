<template>
    <div class="weather-widget"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCurrentWeather } from './api'

export default defineComponent({
    name: 'App',
    created() {
        getCurrentWeather({ lat: '59.908489', lon: '30.513569' })
    },
})
</script>
