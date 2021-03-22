<template>
    <v-main>
        <map-component></map-component>
    </v-main>
</template>
<script>
    import MapComponent from '../components/MapComponent.vue'
    import { mapActions } from 'vuex'

    export default {
        components: {
            MapComponent,
        },

        async mounted() {
            await this.fetchPersonal()
        },

        methods: {
            ...mapActions(['fetchPersonal']),
        },
    }
</script>
