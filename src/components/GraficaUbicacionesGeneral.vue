<template>
    <apexchart width="100%" type="radar" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    type: 'radar',
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    labels: ['Centro', 'Col del Periodista', 'Faldas del Fortin', 'Luis Jiménez Figueroa', 'La soledad'],
                    legend: {
                        labels: {
                            useSeriesColors: true,
                        },
                    },
                },
                series: [
                    {
                        name: 'En comandancia',
                        data: [15, 22, 38, 46, 20],
                        color: '#FFFFFF',
                    },
                    {
                        name: 'Operando',
                        data: [33, 54, 24, 24, 33],
                        color: '#D50000',
                    },
                    {
                        name: 'Libre',
                        data: [4, 2, 20, 12, 31],
                        color: '#00BFA5',
                    },
                ],
            }
        },
    }
</script>
