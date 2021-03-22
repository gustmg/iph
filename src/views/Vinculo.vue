<template>
    <v-main>
        <v-container v-if="!consultaRealizada">
            <v-row align="center">
                <v-col cols="4" offset-md="4">
                    <v-row>
                        <v-col cols="12">
                            <consulta-iph-form></consulta-iph-form>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="12" align="center">
                    <v-btn color="accent" v-on:click="reload()">
                        Realizar nueva búsqueda
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <tabla-resultado-consulta></tabla-resultado-consulta>
                </v-col>
                <v-col cols="9">
                    <red-vinculos-component></red-vinculos-component>
                </v-col>
                <v-col cols="3">
                    <card-consulta-component></card-consulta-component>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
    import { mapGetters } from 'vuex'
    import CardConsultaComponent from '../components/CardConsultaComponent.vue'
    import ConsultaIphForm from '../components/ConsultaIphForm.vue'
    import RedVinculosComponent from '../components/RedVinculosComponent.vue'
    import TablaResultadoConsulta from '../components/TablaResultadoConsulta.vue'

    export default {
        components: {
            ConsultaIphForm,
            TablaResultadoConsulta,
            CardConsultaComponent,
            RedVinculosComponent,
        },

        computed: {
            ...mapGetters({
                consultaDetenido: 'getConsultaDetenido',
                consultaVehiculo: 'getConsultaVehiculoDataTable',
            }),

            consultaRealizada: function() {
                if (this.consultaDetenido.length > 0 || this.consultaVehiculo.length > 0) {
                    return true
                } else {
                    return false
                }
            },

            reload: function() {
                window.location.reload()
            },
        },
    }
</script>

<style></style>
