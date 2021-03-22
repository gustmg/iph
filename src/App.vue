<template>
    <v-app class="primary">
        <navigation-drawer-component></navigation-drawer-component>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <v-snackbar v-model="snackbar.active" color="accent">
            {{ snackbar.message }}
        </v-snackbar>
    </v-app>
</template>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
<script>
    import { mapGetters } from 'vuex'

    import NavigationDrawerComponent from './components/NavigationDrawerComponent.vue'

    export default {
        components: {
            NavigationDrawerComponent,
        },

        computed: {
            ...mapGetters({
                token: 'getToken',
                snackbar: 'getSnackbar',
            }),
        },
    }
</script>
