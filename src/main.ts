import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

const widget = document.querySelector('weather-widget');
widget?.insertAdjacentHTML('beforebegin', '<div id="app"></div>');
document.head.insertAdjacentHTML(
    'beforeend',
    '<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet" type="text/css">'
);
createApp(App).use(Quasar, quasarUserOptions).mount('#app');
