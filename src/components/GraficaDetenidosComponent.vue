<template>
    <apexchart width="90%" type="pie" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
    export default {
        props: {
            detenidos: {
                type: Number,
            },
        },

        data() {
            return {
                series: [33, 14],

                chartOptions: {
                    labels: ['Hombres', 'Mujeres'],
                    legend: {
                        position: 'bottom',
                        labels: {
                            colors: '#FFFFFF',
                        },
                    },
                },
            }
        },
    }
</script>
