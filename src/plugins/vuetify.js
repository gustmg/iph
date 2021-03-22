import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import es from 'vuetify/lib/locale/es'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#141414',
                secondary: '#F3F2FF',
                accent: '#f68632',
                error: '#B00020',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                anchor: '#00003c',
                eon: '#f68632',
            },
            dark: {
                primary: '#00003c',
                secondary: '#bbdefb',
                accent: '#1a05a3',
                error: '#B00020',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                eon: '#f68632',
            },
        },
    },
    lang: {
        locales: { es },
        current: 'es',
    },
})
