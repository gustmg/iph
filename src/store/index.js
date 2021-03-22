import axios from '../plugins/axios'
import Vue from 'vue'
import Vuex from 'vuex'
import axiosEon from '../plugins/axiosEon'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        consultaDetenido: [],
        consultaVehiculo: [],
        consultaHit: [],
        tipoConsulta: null,
        selectedResultado: null,
        valorConsulta: null,
        token: localStorage.getItem('token') || '',
        perfil: localStorage.getItem('perfil') || '',
        nombre: localStorage.getItem('nombre') || '',
        idPersonal: localStorage.getItem('idPersonal') || '',
        snackbar: {
            active: false,
            message: '',
        },
        personal: [
            { apaterno: 'Juárez', amaterno: 'Chávez', nombre: 'Luis', segundoNombre: '', CUIP: '1234567859' },
            { apaterno: 'Álvarez', amaterno: 'Jiménez', nombre: 'Antonio', segundoNombre: '', CUIP: '0321654987' },
            { apaterno: 'Torres', amaterno: 'Cuellar', nombre: 'Felipe', segundoNombre: '', CUIP: '0321654888' },
            { apaterno: 'Castillo', amaterno: 'Morán', nombre: 'Vicente', segundoNombre: '', CUIP: '6513248881' },
            { apaterno: 'Torija', amaterno: 'Durán', nombre: 'Armando', segundoNombre: '', CUIP: '0023156485' },
        ],

        estadisticas: null,
    },

    getters: {
        getSnackbar: state => {
            return state.snackbar
        },

        getToken: state => {
            return state.token
        },

        getPerfil: state => {
            return state.perfil
        },

        getNombre: state => {
            return state.nombre
        },

        getIdPersonal: state => {
            return state.idPersonal
        },

        getConsultaDetenido: state => {
            return state.consultaDetenido
        },

        getConsultaVehiculo: state => {
            return state.consultaVehiculo
        },

        getConsultaHit: state => {
            return state.consultaHit
        },

        getConsultaVehiculoDataTable: state => {
            var data = []

            state.consultaVehiculo.forEach(consulta => {
                data.push({
                    placa: consulta.vehiculo.placas,
                    marca: consulta.vehiculo.marca,
                    submarca: consulta.vehiculo.submarca,
                    modelo: consulta.vehiculo.modelo,
                    color: consulta.vehiculo.color,
                    observaciones: consulta.vehiculo.observaciones,
                })
            })

            state.consultaHit.forEach(consulta => {
                if (consulta.id != 0) {
                    data.push({
                        placa: consulta.placa,
                        marca: consulta.marca,
                        submarca: consulta.submarca,
                        modelo: consulta.modelo,
                        color: consulta.color,
                        observaciones: consulta.informacion,
                    })
                }
            })
            return data
        },

        getTipoConsulta: state => {
            return state.tipoConsulta
        },

        getSelectedResultado: state => {
            return state.selectedResultado
        },

        getValorConsulta: state => {
            return state.valorConsulta
        },

        getPersonal: state => {
            return state.personal.filter(personal => {
                return personal.nombre
            })
        },

        getEstadisticas: state => {
            return state.estadisticas
        },
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },

        SET_PERFIL(state, perfil) {
            state.perfil = perfil
        },

        SET_NOMBRE(state, nombre) {
            state.nombre = nombre
        },

        SET_ID_PERSONAL(state, idPersonal) {
            state.idPersonal = idPersonal
        },

        SET_CONSULTA_DETENIDO(state, consulta) {
            state.consultaDetenido = consulta
        },

        SET_CONSULTA_VEHICULO(state, consulta) {
            state.consultaVehiculo = consulta
        },

        SET_CONSULTA_HIT(state, consultaHit) {
            state.consultaHit = consultaHit
        },

        SET_TIPO_CONSULTA(state, tipoConsulta) {
            state.tipoConsulta = tipoConsulta
        },

        SET_SELECTED_RESULTADO(state, selectedResultado) {
            state.selectedResultado = selectedResultado
        },

        SET_VALOR_CONSULTA(state, valorConsulta) {
            state.valorConsulta = valorConsulta
        },

        SET_SNACKBAR_MESSAGE(state, message) {
            state.snackbar = {
                active: true,
                message: message,
            }
        },

        SET_PERSONAL(state, personal) {
            state.personal = personal
        },

        SET_ESTADISTICAS(state, estadisticas) {
            state.estadisticas = estadisticas
        },
    },

    actions: {
        login: async function({ commit }, user) {
            // await axios
            //     .post('http://eonproduccion.net:31000/v2017001/API/PoliciaCuadrantes/login', user)
            //     .then(res => {
            //         if (res.data.data[0].token.length > 0) {
            //             var token = res.data.data[0].token
            //             var perfil = res.data.data[0].extraInfo.perfil
            //             var nombre = res.data.data[0].fullName
            //             var idPersonal = res.data.data[0].fk_idPersonal
            //             localStorage.setItem('token', token)
            //             localStorage.setItem('perfil', perfil)
            //             localStorage.setItem('nombre', nombre)
            //             localStorage.setItem('idPersonal', idPersonal)
            //             commit('SET_TOKEN', token)
            //             commit('SET_PERFIL', perfil)
            //             commit('SET_NOMBRE', nombre)
            //             commit('SET_ID_PERSONAL', idPersonal)
            //             commit('SET_SNACKBAR_MESSAGE', 'Inicio de sesión realizado. Redirigiendo al launcher.')
            //         } else {
            //             commit('SET_SNACKBAR_MESSAGE', 'No pudo realizarse el inicio de sesión. Por favor, verifique sus credenciales.')
            //         }
            //     })
            //     .catch(error => commit('SET_SNACKBAR_MESSAGE', 'No pudo realizarse el inicio de sesión. Por favor, verifique sus credenciales.'))
            var token = '123456789'
            var perfil = 'Administrador'
            var nombre = 'Administrador'
            var idPersonal = '1'
            localStorage.setItem('token', token)
            localStorage.setItem('perfil', perfil)
            localStorage.setItem('nombre', nombre)
            localStorage.setItem('idPersonal', idPersonal)
            commit('SET_TOKEN', token)
            commit('SET_PERFIL', perfil)
            commit('SET_NOMBRE', nombre)
            commit('SET_ID_PERSONAL', idPersonal)
            commit('SET_SNACKBAR_MESSAGE', 'Inicio de sesión realizado. Redirigiendo al launcher.')
        },

        fetchConsultaByDetenido: async function({ commit }, consulta) {
            commit('SET_VALOR_CONSULTA', consulta.valorConsulta)
            await axios
                .get('/AnexoA/ConsultarDetenido/' + consulta.idPersonal + '/' + consulta.valorConsulta)
                .then(response => {
                    commit('SET_CONSULTA_DETENIDO', response.data)
                    // console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        fetchConsultaByVehiculo: async function({ commit }, consulta) {
            commit('SET_VALOR_CONSULTA', consulta.valorConsulta)
            await axios
                .get('/AnexoC/ConsultarVehiculo/' + consulta.idPersonal + '/' + consulta.valorConsulta)
                .then(response => {
                    commit('SET_CONSULTA_VEHICULO', response.data)
                    // console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        fetchConsultaHitByPlaca: async function({ commit }, consulta) {
            commit('SET_VALOR_CONSULTA', consulta.valorConsulta)
            await axios
                .get('/ApiVehiculo/ConsultaPorPlaca/' + consulta.idPersonal + '/' + consulta.valorConsulta)
                .then(response => {
                    commit('SET_CONSULTA_HIT', response.data)
                    // console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        fetchEstadisticas: async function({ commit }, fechas) {
            await axios
                .post('/Informe/ObtenerEstadisticas/8', fechas)
                .then(response => {
                    commit('SET_ESTADISTICAS', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        fetchPersonal: async function({ commit }) {
            await axiosEon
                .get('/PoliciaCuadrantes/EstadoFuerza/personal')
                .then(response => {
                    commit('SET_PERSONAL', response.data.data)
                })
                .catch(error => console.log(error))
        },
    },
})
