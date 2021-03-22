<template>
    <v-card class="glass">
        <v-card-text>
            <network class="vinculo" ref="network" :nodes="nodes" :edges="edges" :options="options" v-on:click="triggerSelectResultado($event)"> </network>
        </v-card-text>
    </v-card>
</template>
<style scoped>
    .vinculo {
        height: 60vh;
    }
    .glass {
        background: rgba(20, 20, 20, 0.15) !important;

        backdrop-filter: blur(5.5px) !important;
        -webkit-backdrop-filter: blur(5.5px) !important;
        border-radius: 16px;
    }
</style>
<script>
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        mounted() {
            this.nodes[0].label = 'Búsqueda:\n\n' + this.valorConsulta

            if (this.tipoConsulta == 0) {
                this.consultaVehiculoDataTable.forEach((vehiculo, index) => {
                    this.nodes.push({
                        id: index + 1,
                        label: vehiculo.marca + ' ' + vehiculo.color,
                        font: {
                            color: '#ffffff',
                        },
                        shape: 'icon',
                        icon: {
                            face: 'FontAwesome',
                            code: '\uf1b9',
                            color: '#f2f2f2',
                            size: '48',
                        },
                        margin: 24,
                    })
                    this.edges.push({
                        from: 0,
                        to: index + 1,
                    })
                })
            } else {
                this.consultaDetenido.forEach(persona => {
                    this.nodes.push({
                        id: persona.infoPersonal.idPersona,
                        label: persona.infoPersonal.nombres + ' ' + persona.infoPersonal.apellidoPaterno + ' ' + persona.infoPersonal.apellidoMaterno,
                        font: {
                            color: '#ffffff',
                        },
                        shape: 'icon',
                        icon: {
                            face: 'FontAwesome',
                            code: '\uf007',
                            color: '#f2f2f2',
                            size: '48',
                        },
                        margin: 24,
                    })
                    this.edges.push({
                        from: 0,
                        to: persona.infoPersonal.idPersona,
                    })
                })
            }
        },

        data() {
            return {
                nodes: [
                    {
                        id: 0,
                        label: '',
                        title: 'Orígen',
                        font: {
                            color: '#ffffff',
                        },
                        shape: 'icon',
                        icon: {
                            face: 'FontAwesome',
                            code: '\uf002',
                            color: '#f68632',
                            size: '48',
                        },
                        margin: 24,
                    },
                ],
                edges: [
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 2, to: 4 },
                    { from: 2, to: 5 },
                    { from: 5, to: 6 },
                    { from: 5, to: 7 },
                    { from: 6, to: 8 },
                ],
                options: {
                    nodes: {
                        borderWidth: 2,
                    },
                    edges: {
                        color: 'lightgray',
                    },
                },
            }
        },

        computed: {
            ...mapGetters({
                valorConsulta: 'getValorConsulta',
                tipoConsulta: 'getTipoConsulta',
                consultaDetenido: 'getConsultaDetenido',
                consultaVehiculoDataTable: 'getConsultaVehiculoDataTable',
                selectedResultado: 'getSelectedResultado',
            }),
        },

        methods: {
            ...mapMutations(['SET_SELECTED_RESULTADO']),

            triggerSelectResultado: function(e) {
                if (this.tipoConsulta == 0) {
                } else {
                    var selected = this.consultaDetenido.filter(persona => {
                        return persona.infoPersonal.idPersona == e.nodes
                    })

                    this.SET_SELECTED_RESULTADO(selected[0])
                }
            },
        },
    }
</script>
