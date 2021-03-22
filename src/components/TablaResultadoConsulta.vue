<template>
    <v-card color="primary lighten-1" class="rounded-lg neu-card">
        <v-card-title>
            <div class="text-h6 font-weight-bold white--text">Resultados de consulta</div>
            <v-spacer></v-spacer>
            <v-text-field label="Buscar en resultados" dense append-icon="mdi-magnify" v-model="filtroConsulta" solo></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="consultaHeaders"
                :items="consultaData"
                item-key="infoPersonal.idPersona"
                :search="filtroConsulta"
                class="transparent white--text"
                hide-default-footer
                disable-pagination
                show-select
                single-select
                dark
                dense
                v-on:item-selected="triggerSelectResultado($event)"
                :value="[selectedResultado]"
            >
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                filtroConsulta: '',
            }
        },

        computed: {
            ...mapGetters({
                consultaDetenido: 'getConsultaDetenido',
                consultaVehiculoDataTable: 'getConsultaVehiculoDataTable',
                tipoConsulta: 'getTipoConsulta',
                selectedResultado: 'getSelectedResultado',
            }),

            consultaHeaders: function() {
                if (this.tipoConsulta == 1) {
                    return [
                        { text: 'Nombre', value: 'infoPersonal.nombres', class: 'white--text' },
                        { text: 'Apellido paterno', value: 'infoPersonal.apellidoPaterno', class: 'white--text' },
                        { text: 'Apellido materno', value: 'infoPersonal.apellidoMaterno', class: 'white--text' },
                        { text: 'Fecha y hora', value: 'generalIPH.fechaHora', class: 'white--text' },
                        { text: 'Referencia', value: 'generalIPH.referencia', class: 'white--text' },
                        { text: 'Tipo IPH', value: 'generalIPH.tipoIPH', class: 'white--text' },
                        { text: 'Fecha y hora de puesto a disposición', value: 'generalIPH.fechaHoraPuestaDisposicion', class: 'white--text' },
                    ]
                } else {
                    return [
                        { text: 'Placa', value: 'placa', class: 'white--text' },
                        { text: 'Marca', value: 'marca', class: 'white--text' },
                        { text: 'Submarca', value: 'submarca', class: 'white--text' },
                        { text: 'Modelo', value: 'modelo', class: 'white--text' },
                        { text: 'Color', value: 'color', class: 'white--text' },
                        { text: 'Observaciones', value: 'observaciones', class: 'white--text' },
                    ]
                }
            },

            consultaData: function() {
                if (this.tipoConsulta == 1) {
                    return this.consultaDetenido
                } else return this.consultaVehiculoDataTable
            },
        },

        methods: {
            ...mapMutations(['SET_SELECTED_RESULTADO']),

            triggerSelectResultado: function(e) {
                this.SET_SELECTED_RESULTADO(e.item)
            },
        },
    }
</script>
