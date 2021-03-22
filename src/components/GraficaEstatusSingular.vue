<template>
    <apexchart width="100%" type="radialBar" :options="options" :series="series"></apexchart>
</template>
<script>
    export default {
        props: {
            color: {
                type: String,
            },
            serie: {
                type: Number,
            },
        },

        data() {
            return {
                options: {
                    plotOptions: {
                        radialBar: {
                            startAngle: -90,
                            endAngle: 90,
                            dataLabels: {
                                name: {
                                    show: false,
                                },
                                value: {
                                    fontSize: '16px',
                                    show: true,
                                    color: '#FFFFFF',
                                },
                            },
                        },
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            gradientToColors: ['#f2f2f2'],
                            stops: [0, 100],
                        },
                    },
                    stroke: {
                        lineCap: 'butt',
                    },
                    labels: ['En comandancia'],
                    colors: [this.color],
                    responsive: [
                        {
                            breakpoint: 1366,
                            options: {
                                plotOptions: {
                                    radialBar: {
                                        startAngle: -90,
                                        endAngle: 90,
                                        dataLabels: {
                                            name: {
                                                show: false,
                                            },
                                            value: {
                                                fontSize: '16px',
                                                show: false,
                                                color: '#FFFFFF',
                                            },
                                        },
                                    },
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shade: 'dark',
                                        type: 'horizontal',
                                        gradientToColors: ['#f2f2f2'],
                                        stops: [0, 100],
                                    },
                                },
                                stroke: {
                                    lineCap: 'butt',
                                },
                                labels: ['En comandancia'],
                                colors: [this.color],
                            },
                        },
                    ],
                },
                series: [this.serie],
            }
        },
    }
</script>
