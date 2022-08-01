import { createApp } from 'vue'
import App from './App.vue'

const widget = document.querySelector('weather-widget')
widget?.insertAdjacentHTML('beforebegin', '<div id="app"></div>')
createApp(App).mount('#app')
