<template>
    <v-main>
        <v-container class="primary lighten-2">
            <v-row>
                <v-col cols="6">
                    <v-card color="primary lighten-1" class="rounded-lg neu-card" elevation="12" height="100%">
                        <v-card-title class="justify-center">
                            <div class="text-h6 font-weight-bold white--text">Estatus de elementos por colonia</div>
                        </v-card-title>
                        <v-card-text align="center">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <grafica-ubicaciones-general></grafica-ubicaciones-general>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="4">
                                                <v-card class="glass">
                                                    <grafica-estatus-singular color="#263238" :serie="20"></grafica-estatus-singular>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-card class="glass">
                                                    <grafica-estatus-singular color="#D50000" :serie="34"></grafica-estatus-singular>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-card class="glass">
                                                    <grafica-estatus-singular color="#00BFA5" :serie="55"></grafica-estatus-singular>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12">
                            <v-card color="primary lighten-1" class="rounded-lg neu-card">
                                <v-card-title>
                                    <div class="text-h6 font-weight-bold white--text">Lista de IPH's (5 en total)</div>
                                </v-card-title>
                                <v-card-text>
                                    <v-data-table
                                        :headers="iphHeaders"
                                        :items="iph"
                                        class="transparent white--text"
                                        hide-default-footer
                                        disable-pagination
                                        dark
                                    >
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card color="primary lighten-1" class="rounded-lg neu-card" elevation="12">
                                <v-card-title>
                                    <div class="text-h6 font-weight-bold white--text">Detenciones</div>
                                </v-card-title>
                                <v-card-text align="center">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="8">
                                                <grafica-detenidos-component :detenidos="34"></grafica-detenidos-component>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-row>
                                                    <v-col cols="12" align="left">
                                                        <v-card class="glass">
                                                            <v-card-title class="justify-center">
                                                                <v-icon color="accent" size="60">mdi-pistol</v-icon>
                                                                <div class="text-subtitle-2 font-weight-black white--text">46 Armas aseguradas</div>
                                                            </v-card-title>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" align="left">
                                                        <v-card class="glass">
                                                            <v-card-title class="justify-center">
                                                                <v-icon color="accent" size="60">mdi-car</v-icon>
                                                                <div class="text-subtitle-2 font-weight-black white--text">12 Vehículos asegurados</div>
                                                            </v-card-title>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<style scoped>
    .glass {
        background: rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
    }
</style>
<script>
    import { mapActions } from 'vuex'
    import GraficaEstatusGeneral from '../components/GraficaEstatusGeneral.vue'
    import GraficaEstatusSingular from '../components/GraficaEstatusSingular.vue'
    import GraficaUbicacionesGeneral from '../components/GraficaUbicacionesGeneral.vue'
    import GraficaDetenidosComponent from '../components/GraficaDetenidosComponent.vue'

    export default {
        components: {
            GraficaEstatusGeneral,
            GraficaUbicacionesGeneral,
            GraficaEstatusSingular,
            GraficaDetenidosComponent,
        },

        async mounted() {
            await this.fetchEstadisticas({
                fechaInicio: '2021-01-01',
                fechaFin: '2021-04-01',
            })
        },

        data() {
            return {
                iphHeaders: [
                    { text: 'CUIP', value: 'id', class: 'white--text' },
                    { text: 'Fecha y hora', value: 'fechaHora', class: 'white--text' },
                    { text: 'Estatus', value: 'estatus', class: 'white--text' },
                    { text: 'Comentarios', value: 'comentarios', class: 'white--text' },
                ],

                iph: [
                    { id: 1, estatus: 'Operando', fechaHora: '22/02/2021 14:22:39', comentarios: 'Test' },
                    { id: 2, estatus: 'Libre', fechaHora: '22/02/2021 14:22:39', comentarios: 'N/A' },
                    { id: 3, estatus: 'En comandancia', fechaHora: '22/02/2021 14:22:39', comentarios: 'Comentario de prueba' },
                    { id: 4, estatus: 'En comandancia', fechaHora: '22/02/2021 14:22:39', comentarios: 'N/A' },
                    { id: 5, estatus: 'Operando', fechaHora: '22/02/2021 14:22:39', comentarios: 'N/A' },
                ],
            }
        },

        methods: {
            ...mapActions(['fetchConsultaByDetenido', 'fetchEstadisticas']),
        },
    }
</script>
