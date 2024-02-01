import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import mdi-icons CSS
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {

            },
            dark: {

            },
        },
    },
    icons: {
        iconfont: 'mdi',
    }
})

createApp(App)
      .use(vuetify)
      .use(router)
      .mount('#app');
