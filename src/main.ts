import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const widget = document.querySelector('weather-widget')
widget?.insertAdjacentHTML('beforebegin', '<div id="app"></div>')
createApp(App).use(Quasar, quasarUserOptions).mount('#app')
