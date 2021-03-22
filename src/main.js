import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import VueParticles from 'vue-particles'
import device from 'vue-device-detector'
import { Network } from 'vue-vis-network'
import 'vue-vis-network/node_modules/vis-network/dist/vis-network.css'

Vue.config.productionTip = false

Vue.use(VueParticles)
Vue.use(device)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)
Vue.component('network', Network)

Vue.mixin({
    methods: {
        logout() {
            localStorage.removeItem('nombre')
            localStorage.removeItem('token')
            localStorage.removeItem('perfil')
            localStorage.removeItem('idPersonal')
        },
    },
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')
