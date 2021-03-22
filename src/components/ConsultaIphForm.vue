<template>
    <v-card class="primary" elevation="8">
        <v-card-title class="justify-center">
            <div class="text-h6 font-weight-bold white--text">Consulta</div>
        </v-card-title>
        <v-card-text align="center">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-icon v-if="tipoBusqueda == 0" color="accent" size="80">mdi-car</v-icon>
                        <v-icon v-else color="accent" size="80">mdi-account</v-icon>
                    </v-col>
                    <v-col cols="12">
                        <v-btn-toggle v-model="tipoBusqueda" background-color="accent" rounded dense mandatory>
                            <v-btn class="px-8" color="accent">Vehículo</v-btn>
                            <v-btn class="px-8" color="accent">Persona</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-if="tipoBusqueda == 0"
                            v-model="buscaVehiculo"
                            label="Buscar vehículo por placa o vin"
                            solo
                            append-icon="mdi-magnify"
                        ></v-text-field>
                        <v-text-field v-else v-model="buscaPersona" label="Buscar persona por CURP o RFC" solo append-icon="mdi-magnify"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="accent" class="px-8" rounded :disabled="!validForm" v-on:click="triggerConsulta()">Realizar búsqueda</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
    import { mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                loading: false,
                tipoBusqueda: 0,
                buscaVehiculo: 'EDD4372',
                buscaPersona: 'RFC010101',
            }
        },

        computed: {
            validForm: function() {
                if (this.tipoBusqueda == 0) {
                    if (this.buscaVehiculo == '') {
                        return false
                    } else return true
                } else {
                    if (this.buscaPersona == '') {
                        return false
                    } else return true
                }
            },
        },

        methods: {
            ...mapActions(['fetchConsultaByDetenido', 'fetchConsultaByVehiculo', 'fetchConsultaHitByPlaca']),
            ...mapMutations(['SET_TIPO_CONSULTA']),

            triggerConsulta: async function() {
                this.loading = true

                if (this.tipoBusqueda == 0) {
                    this.SET_TIPO_CONSULTA(0)
                    await this.fetchConsultaByVehiculo({
                        idPersonal: 1,
                        valorConsulta: this.buscaVehiculo,
                    })
                    await this.fetchConsultaHitByPlaca({
                        idPersonal: 1,
                        valorConsulta: this.buscaVehiculo,
                    })
                } else {
                    this.SET_TIPO_CONSULTA(1)
                    await this.fetchConsultaByDetenido({
                        idPersonal: 1,
                        valorConsulta: this.buscaPersona,
                    })
                }

                this.loading = false
            },
        },
    }
</script>

<style></style>
