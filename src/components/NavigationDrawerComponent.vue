<template>
    <v-navigation-drawer app color="primary" width="220" v-if="token.length > 0">
        <v-list nav>
            <v-list-item-group>
                <v-list-item to="/">
                    <v-list-item-avatar>
                        <v-icon color="secondary">mdi-monitor-dashboard</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <div class="text-subtitle-2 font-weight-bold secondary--text">Tablero</div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/map">
                    <v-list-item-avatar>
                        <v-icon color="secondary">mdi-map-marker</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <div class="text-subtitle-2 font-weight-bold secondary--text">Ubicaciones</div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/vinculo">
                    <v-list-item-avatar>
                        <v-icon color="secondary">mdi-graph</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <div class="text-subtitle-2 font-weight-bold secondary--text">Vínculos</div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <!-- <template v-slot:append>
            <div class="pa-4">
                <v-btn block rounded color="accent" class="white--text" v-on:click="triggerLogout()">Cerrar sesión</v-btn>
            </div>
        </template> -->
    </v-navigation-drawer>
</template>
<script>
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                token: 'getToken',
            }),
        },

        methods: {
            ...mapMutations(['SET_SNACKBAR_MESSAGE']),

            triggerLogout: function() {
                this.SET_SNACKBAR_MESSAGE('Cerrando sesión...')
                this.logout()
                window.location.reload()
            },
        },
    }
</script>
