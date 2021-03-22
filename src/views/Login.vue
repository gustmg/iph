<template>
    <v-main style="height:100vh;overflow-y:hidden;">
        <div id="particles-js"></div>
        <v-container>
            <v-row style="height:80vh" align="center">
                <v-col cols="3" class="mx-auto">
                    <v-form v-model="loginForm">
                        <kinesis-container>
                            <kinesis-element :strength="12" type="depth">
                                <v-card class="glass">
                                    <v-card-title class="d-block" align="center">
                                        <img src="@/assets/img/policia.png" width="140" class="logo mb-8" />
                                        <div class="font-weight-bold text-h6 justify-center primary--text">
                                            Inicio de sesión
                                        </div>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form v-model="loginForm">
                                            <v-text-field v-model="name" solo label="Usuario" :rules="passwordRules" validate-on-blur></v-text-field>
                                            <v-text-field v-model="password" solo label="Contraseña" type="password" :rules="passwordRules"></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="8" offset-md="2" align="center">
                                                    <v-btn
                                                        color="accent"
                                                        class="mb-4 secondary--text"
                                                        v-on:click="triggerLogin()"
                                                        block
                                                        :disabled="!loginForm || loading"
                                                        >Iniciar sesión</v-btn
                                                    >
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-actions>
                                </v-card>
                            </kinesis-element>
                        </kinesis-container>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<style scoped>
    #particles-js {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--v-primary-base);
    }
    img {
        -webkit-filter: drop-shadow(5px 5px 5px #666666);
        filter: drop-shadow(5px 5px 5px #666666);
    }
    .armeria {
        position: fixed;
        bottom: 0;
        left: 48px;
        font-size: 96px;
        opacity: 0.78;
        text-shadow: 4px 4px 8px black;
    }
    .card {
        -webkit-box-shadow: 0px 48px 24px -32px rgba(0, 0, 60, 0.61) !important;
        box-shadow: -1px 50px 48px -30px rgba(0, 0, 60, 0.61) !important;
    }

    .glass {
        background: rgba(255, 255, 255, 0.48) !important;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
        backdrop-filter: blur(2px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
    }
</style>
<script>
    import 'particles.js'
    import sha1 from 'sha1'
    import { mapMutations, mapActions, mapGetters } from 'vuex'

    export default {
        mounted() {
            this.initParticles()
        },

        data() {
            return {
                loginForm: false,
                loading: false,
                name: '',
                password: '',
                passwordRules: [v => !!v || 'Este campo es requerido.'],
            }
        },

        computed: {
            ...mapGetters({
                token: 'getToken',
            }),
        },

        watch: {
            token(newToken) {
                if (newToken.length > 0) {
                    this.$router.push('/')
                }
            },
        },

        methods: {
            ...mapActions(['login']),

            ...mapMutations(['SET_SNACKBAR_MESSAGE']),

            initParticles() {
                window.particlesJS('particles-js', {
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: '#ffffff',
                        },
                        shape: {
                            type: 'circle',
                            stroke: {
                                width: 0,
                                color: '#000000',
                            },
                            polygon: {
                                nb_sides: 5,
                            },
                            image: {
                                src: 'img/github.svg',
                                width: 100,
                                height: 100,
                            },
                        },
                        opacity: {
                            value: 0.5,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 6,
                            direction: 'none',
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                            },
                            onclick: {
                                enable: true,
                                mode: 'push',
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 1,
                                },
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 8,
                                speed: 3,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                            push: {
                                particles_nb: 4,
                            },
                            remove: {
                                particles_nb: 2,
                            },
                        },
                    },
                    retina_detect: true,
                })
            },

            triggerLogin: async function() {
                this.loading = true
                await this.login({
                    loginField: this.name,
                    passwordField: sha1(this.password).toUpperCase(),
                })

                this.loading = false
            },
        },
    }
</script>
