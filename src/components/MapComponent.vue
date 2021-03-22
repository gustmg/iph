<template>
    <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="center"
        :zoom="16"
        :bearing="-17.6"
        :pitch="45"
        :antialias="true"
        v-on:dblclick="triggerNuevaUnidad($event)"
        :doubleClickZoom="false"
    >
        <MglDraw />
        <MglMarker
            v-for="unidad in unidades"
            :coordinates="[unidad.lng, unidad.lat]"
            :color="unidad.color"
            :key="unidad.idPersonal"
            draggable
            v-on:dragend="updateMarker($event, unidad)"
        />
        <MglGeocoderControl :accessToken="accessToken" :input="defaultInput" @results="handleSearch" placeholder="Buscar lugar o dirección" />

        <v-card class="neu-card card" width="320" elevation="8">
            <v-card-title class="justify-center">
                <div class="text-h6 font-weight-bold white--text">Lista de encuestas</div>
            </v-card-title>
            <v-card-text>
                <v-text-field label="Buscar" solo dense v-model="search"></v-text-field>
                <v-list color="transparent" dense>
                    <v-list-item v-for="(elemento, index) in filteredUnidades" :key="index">
                        <v-list-item-content>
                            <v-list-item-title class="mb-0">
                                <div class="text-subtitle-2 font-weight-black white--text">{{ elemento.cuip }}</div>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <div v-if="elemento.estatus == 1" class="text-caption white--text">En comandancia</div>
                                <div v-if="elemento.estatus == 2" class="text-caption blue--text">En fatiga</div>
                                <div v-if="elemento.estatus == 3" class="text-caption red--text">Operando</div>
                                <div v-if="elemento.estatus == 4" class="text-caption green--text">Libre</div>
                                <div v-if="elemento.estatus == 5" class="text-caption pink--text">En ministerio público</div>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon color="accent" v-on:click="getLang()">
                                <v-icon>mdi-map-marker</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-dialog v-model="nuevaUnidadDialog" width="480" persistent>
            <v-card class="neu-card">
                <v-card-title class="white--text font-weight-bold justify-center">Nueva unidad en mapa</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row align="center">
                            <v-col cols="4" offset="2">
                                <v-progress-circular :value="activeStep * 50" size="96" width="12" color="accent" rotate="-90"></v-progress-circular>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-caption white--text">PASO {{ activeStep }}</div>
                                <div class="text-subtitle-1 font-weight-bold white--text">{{ activeStepTitle }}</div>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="activeStep == 1">
                        <v-row>
                            <v-col cols="12">
                                <v-form v-model="cuipForm">
                                    <v-autocomplete
                                        v-model="buscaCuip"
                                        label="Ingrese CUIP"
                                        :items="personal"
                                        item-text="CUIP"
                                        :rules="cuipRules"
                                        solo
                                        dense
                                        clearable
                                    >
                                        <template v-slot:item="{ item }">
                                            <v-list-item-avatar color="accent" class="headline font-weight-light white--text">
                                                <v-icon color="white">mdi-police-badge</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title class="font-weight-bold">{{
                                                    item.apaterno + ' ' + item.amaterno + ' ' + item.nombre + ' ' + item.segundoNombre
                                                }}</v-list-item-title>
                                                <v-list-item-subtitle v-text="item.CUIP"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                        <template v-slot:no-data>
                                            <v-container v-if="personal.length == 0">
                                                <v-row>
                                                    <v-col cols="12" align="center">
                                                        <v-progress-circular indeterminate color="accent"></v-progress-circular>
                                                        <div class="text-caption font-weight-bold mt-4">Cargando datos. Por favor, espere...</div>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </template>
                                    </v-autocomplete>
                                </v-form>
                                <v-expand-transition>
                                    <v-card color="accent" v-if="selectedPersonal">
                                        <v-card-title class="d-block" align="center">
                                            <v-icon size="56" color="white">mdi-police-badge</v-icon>
                                            <div class="text-h6 font-weight-bold white--text">
                                                {{
                                                    selectedPersonal.apaterno +
                                                        ' ' +
                                                        selectedPersonal.amaterno +
                                                        ' ' +
                                                        selectedPersonal.nombre +
                                                        ' ' +
                                                        selectedPersonal.segundoNombre
                                                }}
                                            </div>
                                            <div class="text-subtitle-1 white--text">{{ selectedPersonal.CUIP }}</div>
                                        </v-card-title>
                                    </v-card>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-else>
                        <v-row>
                            <v-col cols="12">
                                <v-select v-model="unidad.estatus" solo label="Estatus" :items="estatusUnidad" item-value="id" item-text="title"></v-select>
                                <v-textarea v-model="unidad.comentarios" no-resize rows="4" label="Comentarios" solo></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="px-8" text color="white" v-on:click="closeDialog()">Cancelar</v-btn>
                    <v-btn class="px-8" color="accent" v-on:click="activeStepButtonHandler()" :disabled="loading || !validActiveStep">{{
                        activeStepButtonLabel
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="updateUnidadDialog" width="480" persistent>
            <v-card class="neu-card">
                <v-card-title class="white--text font-weight-bold justify-center">Editar unidad en mapa</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    v-model="editaUnidad.estatus"
                                    solo
                                    label="Estatus"
                                    :items="estatusUnidad"
                                    item-value="id"
                                    item-text="title"
                                ></v-select>
                                <v-textarea v-model="editaUnidad.comentarios" no-resize rows="4" label="Comentarios" solo></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="px-8" text color="white" v-on:click="updateUnidadDialog = false">Cancelar</v-btn>
                    <v-btn class="px-8" color="accent" v-on:click="updateUnidad()">Actualizar unidad</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </MglMap>
</template>
<style scoped>
    .card {
        position: absolute;
        top: 8px;
        left: 16px;
    }
</style>
<script>
    import Mapbox from 'mapbox-gl'
    import { MglMap, MglMarker } from 'vue-mapbox'
    import $ from 'jquery'
    import MglGeocoderControl from 'vue-mapbox-geocoder'
    import { mapGetters } from 'vuex'
    import MglDraw from './MglDraw.vue'

    export default {
        components: {
            MglMap,
            MglMarker,
            MglGeocoderControl,
            MglDraw,
        },

        created() {
            this.mapbox = Mapbox
        },

        data() {
            return {
                accessToken: 'pk.eyJ1IjoiZ3VzdG1nIiwiYSI6ImNramtlb2liazRwbDgzM255ajJleWd2cWUifQ.IXSXU4vuLx_zyN5c8lcvYg',
                mapStyle: 'mapbox://styles/gustmg/cklhme6sw0ang17mk5se5tpdz',

                unidades: [
                    {
                        cuip: '12345678900',
                        idPersonal: 7,
                        lat: 17.0605824,
                        lng: -96.7252287,
                        // fechaHora: null,
                        estatus: 1,
                        comentarios: '',
                        color: 'black',
                    },
                    {
                        cuip: '6543218885',
                        idPersonal: 8,
                        lat: 17.0664824,
                        lng: -96.7252287,
                        // fechaHora: null,
                        estatus: 3,
                        comentarios: '',
                        color: 'red',
                    },
                    {
                        cuip: '6543218885',
                        idPersonal: 9,
                        lat: 17.0664824,
                        lng: -96.7222287,
                        // fechaHora: null,
                        estatus: 4,
                        comentarios: '',
                        color: '#00BFA5',
                    },
                ],

                estatusUnidad: [
                    { id: 1, title: 'En comandancia' },
                    // { id: 2, title: 'En fatiga' },
                    { id: 3, title: 'Operando' },
                    { id: 4, title: 'Libre' },
                    // { id: 5, title: 'En ministerio público' },
                ],

                nuevaUnidadDialog: false,
                updateUnidadDialog: false,
                nuevaUnidadForm: false,
                activeStep: 1,
                loading: false,

                cuipForm: false,
                buscaCuip: '',

                cuipRules: [v => !!v || 'Por favor, ingrese este campo.'],

                unidad: {
                    cuip: '',
                    idPersonal: null,
                    lat: null,
                    lng: null,
                    fechaHora: null,
                    estatus: null,
                    comentarios: '',
                    color: '#ffffff',
                },

                editaUnidad: {
                    cuip: '',
                    idPersonal: null,
                    lat: null,
                    lng: null,
                    fechaHora: null,
                    estatus: null,
                    comentarios: '',
                    color: '#FFFFFF',
                },

                marker: null,
                defaultInput: '',
                center: [-96.7252287, 17.0605824],

                search: '',
            }
        },

        computed: {
            ...mapGetters({
                personal: 'getPersonal',
            }),

            activeStepTitle: function() {
                switch (this.activeStep) {
                    case 1:
                        return 'Buscar CUIP'
                    case 2:
                        return 'Información de unidad'
                }
            },

            validActiveStep: function() {
                switch (this.activeStep) {
                    case 1:
                        if (this.cuipForm) {
                            return true
                        } else {
                            return false
                        }
                    case 2:
                        if (this.unidad.estatus) {
                            return true
                        } else {
                            return false
                        }
                }
            },

            activeStepButtonLabel: function() {
                if (this.activeStep < 2) {
                    return 'Siguiente'
                } else {
                    return 'Registrar'
                }
            },

            selectedPersonal: function() {
                if (this.personal.some(personal => personal.CUIP == this.buscaCuip)) {
                    return this.personal.find(personal => personal.CUIP == this.buscaCuip)
                } else {
                    return null
                }
            },

            filteredUnidades: function() {
                return this.unidades.filter(unidad => {
                    return unidad.cuip.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
                })
            },
        },

        methods: {
            updateMarker: function(e, unidad) {
                this.marker = e.marker
                var lngLat = e.marker.getLngLat()
                var index = this.unidades.indexOf(unidad)

                this.unidades[index].lat = lngLat.lat
                this.unidades[index].lng = lngLat.lng
                this.editaUnidad.estatus = this.unidades[index].estatus
                this.editaUnidad.idPersonal = this.unidades[index].idPersonal
                this.updateUnidadDialog = true
            },

            getMarkerColor: function(estatus) {
                switch (estatus) {
                    case 1:
                        return '#000000'

                    case 2:
                        return '#2962FF'

                    case 3:
                        return '#D50000'

                    case 4:
                        return '#00BFA5'

                    case 5:
                        return '#E040FB'
                }
            },

            activeStepButtonHandler: async function() {
                if (this.activeStep < 2) {
                    this.activeStep++
                } else {
                    this.loading = true

                    this.unidades.push({
                        cuip: this.buscaCuip,
                        idPersonal: this.unidades.length + 1,
                        lat: this.unidad.lat,
                        lng: this.unidad.lng,
                        fechaHora: null,
                        estatus: this.unidad.estatus,
                        comentarios: this.unidad.comentarios,
                        color: this.getMarkerColor(this.unidad.estatus),
                    })

                    var x = this.personal.find(personal => personal.CUIP == this.buscaCuip)
                    var index = this.personal.indexOf(x)
                    this.personal.splice(index, 1)

                    this.closeDialog()
                    this.loading = false
                }
            },

            closeDialog: function() {
                this.activeStep = 1
                this.buscaCuip = ''
                this.unidad.estatus = null
                this.unidad.comentarios = ''
                this.nuevaUnidadDialog = false
            },

            triggerNuevaUnidad: function(e) {
                this.unidad.lat = e.mapboxEvent.lngLat.lat
                this.unidad.lng = e.mapboxEvent.lngLat.lng
                this.nuevaUnidadDialog = true
            },

            updateUnidad: function() {
                var unidad = this.unidades.filter(unidad => {
                    return unidad.idPersonal == this.editaUnidad.idPersonal
                })

                unidad[0].estatus = this.editaUnidad.estatus

                this.removeUnidad(this.unidades.indexOf(unidad[0]))

                this.unidades.push({
                    cuip: unidad[0].cuip,
                    idPersonal: unidad[0].idPersonal,
                    lat: unidad[0].lat,
                    lng: unidad[0].lng,
                    fechaHora: null,
                    estatus: this.editaUnidad.estatus,
                    comentarios: this.editaUnidad.comentarios,
                    color: '#ffffff',
                })

                this.setMarkerColor(this.marker, this.getMarkerColor(this.editaUnidad.estatus))

                this.updateUnidadDialog = false
            },

            removeUnidad: function(index) {
                this.unidades.splice(index, 1)
            },

            getEstatusUnidad: function(estatus) {
                switch (estatus) {
                    case 1:
                        return 'En comandancia'
                    case 2:
                        return 'En fatiga'
                    case 3:
                        return 'Operando'
                    case 4:
                        return 'En evaluación médica'
                    case 5:
                        return 'En ministerio público'
                }
            },

            setMarkerColor: function(marker, color) {
                var $elem = $(marker.getElement())
                $elem.find('svg g[fill="' + marker._color + '"]').attr('fill', color)
                marker._color = color
            },

            handleSearch(event) {
                // console.log(event)
            },

            isValidCuip: function(cuip) {
                if (this.personal.some(personal => personal.CUIP == cuip)) {
                    return true
                } else {
                    return false
                }
            },
        },
    }
</script>
