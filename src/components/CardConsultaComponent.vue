<template>
    <v-card class="neu-card" v-if="selectedResultado">
        <v-card-title>
            <v-col cols="12" align="center">
                <v-icon v-if="tipoConsulta == 0" color="secondary" size="80">mdi-car</v-icon>
                <v-icon v-else color="secondary" size="80">mdi-account</v-icon>
                <div class="text-overline white--text" v-if="tipoConsulta == 1">
                    {{
                        selectedResultado.infoPersonal.nombres +
                            ' ' +
                            selectedResultado.infoPersonal.apellidoPaterno +
                            ' ' +
                            selectedResultado.infoPersonal.apellidoMaterno
                    }}
                </div>
                <div class="text-overline white--text" v-else>
                    {{ selectedResultado.marca }}
                </div>
            </v-col>
        </v-card-title>
        <v-card-text>
            <v-container v-if="tipoConsulta == 1">
                <v-row align="center">
                    <v-col cols="12">
                        <v-tabs show-arrows dark background-color="transparent">
                            <v-tab>Tab 1</v-tab>
                            <v-tab>Tab 2</v-tab>
                            <v-tab>Tab 3</v-tab>
                            <v-tab>Tab 4</v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">CURP</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div class="text-subtitle-1 white--text font-weight-bold">{{ selectedResultado.infoPersonal.curp }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">NSS</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div v-if="selectedResultado.infoPersonal.nss" class="text-subtitle-1 white--text font-weight-bold">
                            {{ selectedResultado.infoPersonal.nss }}
                        </div>
                        <div v-else class="text-subtitle-2 white--text">No registrado</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">Clave INE</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div v-if="selectedResultado.infoPersonal.claveINE" class="text-subtitle-1 white--text font-weight-bold">
                            {{ selectedResultado.infoPersonal.claveINE }}
                        </div>
                        <div v-else class="text-subtitle-2 white--text">No registrado</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">Sexo</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div class="text-subtitle-1 white--text font-weight-bold">{{ selectedResultado.infoPersonal.sexo }}</div>
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-else>
                <v-row>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">Placas</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div class="text-subtitle-1 white--text font-weight-bold">{{ selectedResultado.placa }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">Modelo</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div class="text-subtitle-1 white--text font-weight-bold">{{ selectedResultado.modelo }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-subtitle-2 white--text">Color</div>
                    </v-col>
                    <v-col cols="8" align="right">
                        <div class="text-subtitle-1 white--text font-weight-bold">{{ selectedResultado.color }}</div>
                    </v-col>
                    <v-col cols="12" align="center">
                        <div class="text-subtitle-2 white--text">Observaciones:</div>
                        <div class="text-subtitle-1 white--text font-weight-bold" align="left">{{ selectedResultado.observaciones }}</div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {}
        },

        computed: {
            ...mapGetters({
                tipoConsulta: 'getTipoConsulta',
                selectedResultado: 'getSelectedResultado',
            }),
        },
    }
</script>
